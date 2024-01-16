/* eslint-disable react/style-prop-object */
/* eslint-disable max-len */
import Svg from 'components/Svg/Svg';
import { SvgProps } from 'components/Svg/types';
import React from 'react';

const Twitter: React.FC<React.PropsWithChildren<SvgProps>> = (props) => {
  return (
      <Svg width="16" height="14" viewBox="0 0 16 14" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12.6009 0H15.0544L9.69434 5.93026L16 14H11.0627L7.19566 9.10574L2.77087 14H0.31595L6.04904 7.65692L0 0H5.06262L8.55811 4.47354L12.6009 0ZM11.7399 12.5785H13.0993L4.32392 1.34687H2.86506L11.7399 12.5785Z" fill="#B7BDC6"/>
      </Svg>
  );
};

export default Twitter;
