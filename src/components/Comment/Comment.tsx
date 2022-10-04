import React, { useState } from 'react';
import { useAppSelector } from 'store/hooks';

import fallback from '../../assets/images/blackCat.png';

import CommentType from 'types/CommentType';
import { ConfirmModal } from 'components/UI';
import convertDate from 'utils/convertDate';
import { LazyLoadImage } from 'react-lazy-load-image-component';

const Comment: React.FC<{ comment: CommentType; onDeleteComment: (commentId: number) => void }> = ({
  comment,
  onDeleteComment,
}) => {
  const [showConfirmModal, setShowConfirmModal] = useState<boolean>(false);
  const [commentId, setCommentId] = useState<number>(0);

  const { username } = useAppSelector((state) => state.auth);

  const handleDeleteComment = (id: number) => {
    onDeleteComment(id);
  };

  const handleCancelDelete = () => {
    setShowConfirmModal(false);
  };

  return (
    <div className="mb-8 border rounded-md">
      <ConfirmModal
        target="comment"
        toggleConfirmModal={showConfirmModal}
        onCancelDelete={handleCancelDelete}
        onConfirmDelete={handleDeleteComment.bind(null, commentId)}
      />

      <div className="user-name flex justify-between items-center border px-4 py-3 bg-gray-200">
        <span className="flex items-center">
          <LazyLoadImage
            effect="blur"
            src={`${comment?.author?.image}` || fallback}
            className="rounded-full w-[40px] h-[40px] object-cover"
            alt="avatar"
            onError={(e) => (e.currentTarget.src = fallback)}
          />

          <div className="flex flex-col">
            <span className="px-2 capitalize font-semibold">{comment?.author?.username}</span>
            <span>
              <span className="px-2 font-light">{convertDate(new Date(comment?.createdAt))}</span>
            </span>
          </div>
        </span>
        {comment?.author?.username === username && (
          <i
            className="fa-solid fa-trash-can text-red-500 hover:cursor-pointer hover:text-red-600"
            onClick={() => {
              setShowConfirmModal(true);
              setCommentId(comment?.id);
            }}
          ></i>
        )}
      </div>
      <div className="py-5 px-4">{comment?.body}</div>
    </div>
  );
};

export default Comment;
