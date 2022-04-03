import './buttons.scss';
import burger from '@/assets/burger.svg';

export const BtnLight = ({ ...props }) => {
  return (
    <button className={`btn btn-light ${props.size} ${props.width ? props.width : ''} show-${props.show_on_small ? 'true' : 'false'}`} {...props}>
      {props.children}
    </button >
  );
}

export const BtnLightCircle = ({ ...props }) => {
  return (
    <button className={`btn btn-light btn-circle ${props.size} ${props.width ? props.width : ''} show-${props.show_on_small ? 'true' : 'false'}`} {...props}>
      {props.children}
    </button >
  );
}

export const BtnLightCircleOutline = ({ ...props }) => {
  return (
    <button className={`btn btn-light-outline btn-circle ${props.size} ${props.width ? props.width : ''} show-${props.show_on_small ? 'true' : 'false'}`} {...props}>
      {props.children}
    </button >
  );
}

export const BtnBurger = ({ ...props }) => {
  return (
    <a href="#" className={`btn btn-burger ${props.size} ${props.width ? props.width : ''} show-${props.show_on_small ? 'true' : 'false'}`} {...props}>
      <img src={burger} />
    </a>
  )
}

