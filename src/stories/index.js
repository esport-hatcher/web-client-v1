import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';

import { Button, Welcome } from '@storybook/react/demo';

import BaseInput from '../components/BaseInput';

storiesOf('Welcome', module).add('to Storybook', () => (
  <Welcome showApp={linkTo('Button')} />
));

storiesOf('Button', module)
  .add('with text', () => <Button onClick={action('clicked')}>Hello</Button>)
  .add('with some emoji', () => (
    <Button onClick={action('clicked')}>
      <span role="img" aria-label="so cool">
        😀 😎 👍 💯
      </span>
    </Button>
  ))
  .add('just with hi', () => <Button onClick={action('clicked')}>Hi</Button>)
  .add('with lol', () => <Button>Lol</Button>);

storiesOf('Input', module)
  .add('Render a username input', () => <BaseInput placeholder="Username" />)
  .add('Render a password input', () => <BaseInput placeholder="Password" />);
