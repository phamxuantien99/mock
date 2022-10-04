import N from '../../assets/images/Klee/N.webp';
import Q from '../../assets/images/Klee/Q.webp';
import E from '../../assets/images/Klee/E.webp';

import ProfileType from 'types/ProfileType';

const About: React.FC<{ userProfile: ProfileType | undefined }> = ({ userProfile }) => {
  return (
    <div className="my-6">
      <div className="left lg:pr-[3rem]">
        <p className="main-title font-semibold text-xl tracking-widest text-center lg:text-left">
          Bio: {userProfile?.bio}
        </p>
        <p className="sub-title text-3xl font-semibold mt-2 text-center lg:text-left">
          <a
            href="https://genshin-impact.fandom.com/wiki/Klee"
            target="blank"
            className="hover:underline text-red-600"
          >
            Klee
          </a>{' '}
          is a playable Pyro character in Genshin Impact.
        </p>
        <p className="first-para text-md my-4">
          The daughter of the intrepid and often quite destructive adventurer Alice, Klee takes
          after her mother in many ways, much to the dismay of the Knights of Favonius whom she has
          been entrusted to.
        </p>
        <p className="second-para text-sm mb-4">
          <img src={N} alt="normal attack" className="w-[50px]" />
          <span className="font-semibold">
            Normal Attack: <span className="text-red-600">Kaboom!</span>
          </span>{' '}
          Normal Attack Throws things that go boom when they hit things! Perform up to 3 explosive
          attacks, dealing AoE Pyro DMG. Charged Attack Consumes a certain amount of Stamina and
          deals AoE Pyro DMG to opponents after a short casting time. Plunging Attack Gathering the
          power of Pyro, Klee plunges towards the ground from mid-air, damaging all opponents in her
          path. Deals AoE Pyro DMG upon impact with the ground.
        </p>
        <p className="second-para text-sm mb-4">
          <img src={E} alt="elemental skill" className="w-[50px]" />
          <span className="font-semibold">
            Elemental Skill: <span className="text-red-600">Jumpy Dumpty</span>
          </span>{' '}
          Jumpy Dumpty is tons of boom-bang-fun! When thrown, Jumpy Dumpty bounces thrice, igniting
          and dealing AoE Pyro DMG with every bounce. On the third bounce, the bomb splits into many
          mines. The mines will explode upon contact with opponents, or after a short period of
          time, dealing AoE Pyro DMG. Starts with 2 charges.
        </p>
        <p className="second-para text-sm mb-4">
          <img src={Q} alt="elemental burst" className="w-[50px]" />
          <span className="font-semibold">
            Elemental Burst: <span className="text-red-600">Sparks 'n' Splash</span>
          </span>{' '}
          Jumpy Dumpty Klee's Blazing Delight! For the duration of this ability, continuously
          summons Sparks 'n' Splash to attack nearby opponents, dealing AoE Pyro DMG.
        </p>
      </div>
      {/* <div className="right my-8 flex justify-center lg:my-0">
        <iframe
          src="https://www.youtube.com/embed/C_duDk5e8yU?autoplay=1&mute=1"
          className="w-[26rem] h-[20rem] sm:w-[32rem] sm:h-[22rem]"
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div> */}
    </div>
  );
};

export default About;
