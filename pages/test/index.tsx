import { useState } from 'react';

export default function MainPage() {
  const [varOne, setVarOne] = useState();
  const [varTwo, setVarTwo] = useState();
  const varThree = !!varOne === varTwo;
}
