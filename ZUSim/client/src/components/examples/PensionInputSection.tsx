import { useState } from 'react';
import PensionInputSection from '../PensionInputSection';

export default function PensionInputSectionExample() {
  const [desiredPension, setDesiredPension] = useState('');
  
  return (
    <PensionInputSection
      desiredPension={desiredPension}
      onDesiredPensionChange={setDesiredPension}
      averagePension={3200}
    />
  );
}
