export const dropVariants = {
  initial: {
    height: 0,
  },
  animate: {
    height: 'auto',
    transition: {
      ease: 'easeInOut',
      duration: 0.1,
      delayChildren: 0.2, //delay the animation of the categories in the dropdown
    },
  },
  exit: {
    height: 0,
    transition: {
      ease: 'easeInOut',
      duration: 0.1,
    },
  },
};

export const contentVariants = {
  initial: {
    opacity: 0,
    y: -5,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: { ease: 'easeInOut', duration: 0.15 },
  },
  exit: {
    opacity: 0,
    y: 0,
    transition: { duration: 0 },
  },
};

export const bgVariants = {
  initial: {
    backgroundColor: 'rgba(0,0,0,0)',
    backdropFilter: 'blur(0px)',
  },
  animate: {
    backgroundColor: 'rgba(0,0,0,.5)',
    backdropFilter: 'blur(4px)',
    transition: { ease: 'easeInOut', duration: 0.3, delay: 0.1 },
  },
  exit: {
    backgroundColor: 'rgba(0,0,0,0)',
    backdropFilter: 'blur(0px)',
    transition: { ease: 'easeOut', duration: 0.2 },
  },
};
