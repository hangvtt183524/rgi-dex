import Image from 'components/Image';
import { ZERO_ADDRESS } from 'config/constants/misc';
import { BAD_SRCS } from 'config/tokens';
import React, { useState } from 'react';
import { HelpIcon } from 'svgs';
import { Currency } from 'config/sdk-core';

export interface LogoProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  srcs: string[];
  currency?: Currency;
  size?: number;
  height?: number;
  width?: number;
}

const Logo: React.FC<Omit<LogoProps, 'placeholder'>> = ({ srcs, alt, width, height, size = 24, currency, ...rest }) => {
  const [, refresh] = useState<number>(0);

  const src: string | undefined = (srcs || [])?.find((s) => !BAD_SRCS[s] && s !== ZERO_ADDRESS);

  if (src) {
    return (
        currency?.symbol && currency?.symbol === 'RBIF' ?
        <Image src="/assets/images/robo-token-icon.png" width={width || size} height={height || size} alt='' {...rest}/> :
        <Image
        width={width || size}
        height={height || size}
        alt={alt}
        src={src}
        onError={() => {
          if (src) BAD_SRCS[src] = true;
          refresh((i) => i + 1);
        }}
        {...rest}
      />
    );
  }

  return (
    <HelpIcon
      width={width || `${size}px`}
      height={height || `${size}px`}
      fill="#fff"
      {...rest}
      style={{
        transform: 'scale(1.2)',
        ...rest?.style,
      }}
    />
  );
};

export default Logo;
