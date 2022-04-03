import './buttons.scss';

export const BtnLight = ({ children, ...props }) => {
  return (
    <button className={`btn btn-light ${props.btnSize} ${props.btnWidth}`} {...props}>
      {children}
    </button >
  );
}

export const BtnLightCircle = ({ children, ...props }) => {
  return (
    <button className={`btn btn-light btn-circle ${props.btnSize}`} {...props}>
      {children}
    </button >
  );
}

export const BtnLightCircleOutline = ({ children, ...props }) => {
  return (
    <button className={`btn btn-light-outline btn-circle ${props.btnSize}`} {...props}>
      {children}
    </button >
  );
}

