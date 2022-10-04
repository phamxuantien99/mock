import { FormEventHandler, useEffect, useRef, useState } from 'react';
import ReactDOM from 'react-dom';
import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { CSSTransition } from 'react-transition-group';

import './CommentModal.css';
import Loading from '../../../assets/images/Loading.svg';
import Fallback from '../../../assets/images/blackCat.png';

import CommentType from 'types/CommentType';

import { axiosClient } from 'api/axios-utils';
import { useAppSelector } from 'store/hooks';
import { Comment } from 'components';

const ModalOverlay: React.FC<{
  showComments: boolean;
  setShowComments: (toggle: boolean) => void;
  slug: string | undefined;
}> = ({ showComments, setShowComments, slug }) => {
  const [isDeletingComment, setIsDeletingComment] = useState<boolean>(false);
  const [commentInput, setCommentInput] = useState('');
  const [isAddingComment, setIsAddingComment] = useState(false);
  const [showCommentForm, setShowCommentForm] = useState(true);
  const [commentList, setCommentList] = useState<CommentType[]>([]);

  const { isAuthenticated, token, image, username } = useAppSelector((state) => state.auth);

  const nodeRef = useRef(null);
  const nodeAvaRef = useRef(null);
  const nodeBtnRef = useRef(null);

  const handlePostComment: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    if (commentInput && slug && commentInput.trim().length > 0) {
      try {
        setIsAddingComment(true);
        await axiosClient({
          url: `/articles/${slug}/comments`,
          method: 'POST',
          headers: {
            authorization: `Token ${token}`,
          },
          data: {
            comment: {
              body: commentInput,
            },
          },
        });
        refetch();
      } catch (error) {
        setIsAddingComment(false);
        toast.error('Something went wrong, please try again later!');
        console.log(error);
      }
    }
  };

  const handleDeleteComment = async (id: number) => {
    setIsDeletingComment(true);
    try {
      await axiosClient({
        url: `/articles/${slug}/comments/${id}`,
        method: 'DELETE',
        headers: {
          authorization: `Token ${token}`,
        },
      });
      setCommentList((prev) => prev.filter((comment) => comment.id !== id));
      refetch();
      setIsDeletingComment(false);
    } catch (error) {
      setIsDeletingComment(false);
      toast.error('Something went wrong, please try again later!');
      console.log(error);
    }
  };

  const fetchComments = async () => {
    const response = await axiosClient({
      method: 'GET',
      url: `/articles/${slug}/comments`,
      headers: token
        ? {
            authorization: `Token ${token}`,
          }
        : {},
    });
    if (isAddingComment) {
      setIsAddingComment(false);
    }
    return (response.data.comments as CommentType[]).sort((a, b) => {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });
  };

  const { data: comments, refetch } = useQuery(['comments', token, slug], fetchComments, {
    refetchOnWindowFocus: false,
    enabled: !!slug,
    onSuccess: () => {
      setCommentInput('');
    },
  });

  useEffect(() => {
    if (comments) {
      setCommentList(comments);
    }
  }, [comments]);

  useEffect(() => {
    if (showComments) {
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [showComments]);

  return (
    <div
      className={`bg-opacity-50 bg-gray-500 z-30 fixed top-0 left-0 h-full w-full overflow-x-hidden overflow-y-auto ${
        showComments ? '' : 'hidden'
      }`}
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          setShowComments(false);
        }
      }}
    >
      <CSSTransition
        nodeRef={nodeRef}
        in={showComments}
        timeout={300}
        classNames="comments"
        unmountOnExit
      >
        <div
          ref={nodeRef}
          className={`absolute right-0 top-0 bg-white text-black w-full min-h-full h-auto sm:w-[50%] md:w-[40%] lg:w-[33%] px-6 z-40 shadow-2xl`}
        >
          <div className="flex justify-between py-7 text-xl">
            <div>
              Responses <span className="font-bold">({commentList?.length})</span>
            </div>
            <div>
              <i
                className="fa-solid fa-xmark text-2xl cursor-pointer hover:text-red-500"
                onClick={() => setShowComments(false)}
              ></i>
            </div>
          </div>
          {isAuthenticated ? (
            <form
              onSubmit={handlePostComment}
              style={{ boxShadow: 'rgba(0, 0, 0, 0.12) 0px 2px 8px' }}
              className=" p-4"
            >
              <CSSTransition
                nodeRef={nodeAvaRef}
                in={showCommentForm}
                timeout={200}
                classNames="comment-form"
                unmountOnExit
              >
                <div className="flex items-center gap-3 mb-4" ref={nodeAvaRef}>
                  <img
                    src={image || Fallback}
                    className="rounded-[50%] w-[40px] h-[40px] border object-cover"
                    alt="avatar"
                    onError={(e) => (e.currentTarget.src = Fallback)}
                  />
                  <p className="capitalize">{username}</p>
                </div>
              </CSSTransition>

              <textarea
                className={`w-full ${
                  showCommentForm ? 'h-24' : 'h-6'
                } rounded-lg resize-none focus:outline-none`}
                placeholder="What are your thought?"
                onClick={() => setShowCommentForm(true)}
                value={commentInput}
                onChange={(e) => setCommentInput(e.target.value)}
              />

              {isAddingComment ? (
                <div className="text-center font-bold text-lg">
                  <span>Posting</span>

                  <img src={Loading} alt="loading" className="w-12 h-12 mx-auto" />
                </div>
              ) : (
                <CSSTransition
                  nodeRef={nodeBtnRef}
                  in={showCommentForm}
                  timeout={200}
                  classNames="comment-form"
                  unmountOnExit
                >
                  <div className="text-right mt-2" ref={nodeBtnRef}>
                    <button
                      type="button"
                      onClick={() => {
                        setShowCommentForm(false);
                        setCommentInput('');
                      }}
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={!commentInput}
                      className="ml-3 border text-white border-gray-200 bg-[#1a8917] hover:bg-[#0f730c] rounded-3xl px-[0.8rem] py-[0.3rem] disabled:opacity-40 "
                    >
                      Respond
                    </button>
                  </div>
                </CSSTransition>
              )}
            </form>
          ) : (
            <div className="text-center mb-5">
              <p className="text-xl lg:text-2xl font-semibold">
                <span>
                  <Link to="/login" className="text-green-500">
                    Login
                  </Link>
                </span>{' '}
                to comment now!
              </p>
            </div>
          )}
          <hr className="mx-[-24px] mt-4 mb-9" />
          {isDeletingComment ? (
            <div className="absolute top-0 left-0 w-full h-full bg-gray-400 bg-opacity-50">
              <div className="flex justify-center items-center h-full text-2xl font-semibold">
                <span>Deleting</span>
                <img src={Loading} alt="loading" className="w-[4rem] h-[4rem] pt-2" />
              </div>
            </div>
          ) : commentList.length > 0 ? (
            commentList?.map((comment) => (
              <Comment key={comment?.id} comment={comment} onDeleteComment={handleDeleteComment} />
            ))
          ) : (
            <div className="h-[50vh] flex items-center justify-center">
              <div className="text-center text-lg text-gray-500 italic">
                <p>There are currently no responses for this story.</p>
                <p>Be the first to respond.</p>
              </div>
            </div>
          )}
        </div>
      </CSSTransition>
    </div>
  );
};

const CommentModal: React.FC<{
  showComments: boolean;
  setShowComments: (toggle: boolean) => void;
  slug: string | undefined;
}> = ({ showComments, setShowComments, slug }) => {
  return (
    <>
      {ReactDOM.createPortal(
        <ModalOverlay showComments={showComments} setShowComments={setShowComments} slug={slug} />,
        document.getElementById('overlay-comment-modal')!
      )}
    </>
  );
};

export default CommentModal;
