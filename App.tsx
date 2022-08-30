import * as React from 'react';
import './style.css';
import useClickOutside from './hooks/useClickOutside';
import classnames from 'classnames';

export default function App() {
  const [visible, setVisible] = React.useState(false);
  const button = React.useRef();
  const section = React.useRef();
  const [setRef] = useClickOutside(() => {
    setVisible(false);
  });
  React.useEffect(() => {
    setRef([button.current, section.current]);
    // setRef([button, section]);
    // setRef([button.current]);
    // setRef([button]);
  }, []);
  return (
    <div>
      <button onClick={() => setVisible(true)} ref={button}>
        show content
      </button>
      <section
        className={classnames(visible === false && 'hidden')}
        ref={section}
      >
        123
      </section>
    </div>
  );
}
