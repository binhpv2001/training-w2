import {Checkbox} from '@shopify/polaris';
import {useState, useCallback} from 'react';

const CheckboxCustom = () => {
  const [checked, setChecked] = useState(false);
  const handleChange = useCallback(
    (newChecked) => setChecked(newChecked),
    [],
  );

  return (
    <Checkbox
      checked={checked}
      onChange={handleChange}
    />
  );
}

export default CheckboxCustom;