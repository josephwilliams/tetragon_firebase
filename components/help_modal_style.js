module.exports = {
  content : {
    overflow              : 'visible',
    top                   : '48%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)',
    opacity               : '0',
    width                 : '250px',
    transition            : 'opacity 1.0s ease-out',
    background            : 'rgba(73, 73, 73, 0.76)',
    boxShadow             : '0 0px 8px 0 rgba(255, 255, 255, 0.7)'
  },
  overlay: {
    zIndex            : 101,
    position          : 'fixed',
    top               : 0,
    left              : 0,
    right             : 0,
    bottom            : 0,
    backgroundColor   : 'rgba(148, 148, 148, 0.85)'
  }
};
