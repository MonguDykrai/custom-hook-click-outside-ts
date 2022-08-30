import * as React from 'react';
const ERROR_MESSAGE = 'useClickOutside: invalid property ref.';

export default function useClickOutside(callback: Function) {
  const [ref, setRef] = React.useState<any>(null);

  const click = React.useCallback(
    (e) => {
      if (ref instanceof Object === false) throw new Error(ERROR_MESSAGE);

      try {
        if (Array.isArray(ref)) {
          if (
            ref.every((ele) => ele.current) &&
            ref.every((ele) => ele.current instanceof HTMLElement)
          ) {
            if (ref.some((ele) => ele.current.contains(e.target)) === false) {
              callback && callback();
            }
          } else if (ref.some((ele) => ele.contains(e.target)) === false) {
            callback && callback();
          }
        } else {
          if (ref.current && ref.current instanceof HTMLElement) {
            callback && callback();
          } else if (ref instanceof HTMLElement) {
            callback && callback();
          }
        }
      } catch (error) {
        throw new Error(ERROR_MESSAGE);
      }
    },
    [ref, callback]
  );

  React.useEffect(() => {
    if (ref) document.addEventListener('click', click, true);

    return () => {
      if (ref) document.removeEventListener('click', click, true);
    };
  }, [ref]);

  return [setRef];
}
