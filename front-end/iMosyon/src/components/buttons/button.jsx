import './buttons.scss';
import burger from '@/assets/burger.svg';

export const BtnLight = ({ children, ...props }) => {
  return (
    <button className={`btn btn-light ${props.btnSize} ${props.btnWidth} show-${props.showOnSmall ? 'true' : 'false'}`} {...props}>
      {children}
    </button >
  );
}

export const BtnLightCircle = ({ children, ...props }) => {
  return (
    <button className={`btn btn-light btn-circle ${props.btnSize} show-${props.showOnSmall ? 'true' : 'false'}`} {...props}>
      {children}
    </button >
  );
}

export const BtnLightCircleOutline = ({ children, ...props }) => {
  return (
    <button className={`btn btn-light-outline btn-circle ${props.btnSize} show-${props.showOnSmall ? 'true' : 'false'}`} {...props}>
      {children}
    </button >
  );
}

export const BtnBurger = ({ children, ...props }) => {
  return (
    <a href="#" className={`btn btn-burger ${props.btnSize} show-${props.showOnSmall ? 'true' : 'false'}`} {...props}>
      <img src={burger} />
    </a>
  )
}

