import { ChangeEvent, useState } from 'react';
import { config } from '@/effects/pixelate';

function PixelateOptions() {
  const [pixelation, setPixelation] = useState<number>(5)

  const handleSlider = (e: ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.currentTarget.value)
    config.size = value;
    setPixelation(value)
  }

  return (
    <>
      <input
        type="range"
        id="pixelation"
        name="pixelation"
        min="3"
        max="20"
        value={ pixelation }
        onChange={ handleSlider }
      />
    </>
  )
}

export default PixelateOptions
