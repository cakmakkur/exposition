interface PropTypes {
  top: string;
  bottom: string;
}

export default function Divider({ top, bottom }: PropTypes) {
  const style = {
    width: "100%",
    height: "50vh",
    background: `linear-gradient(180deg, ${top} 0%, ${bottom} 100%)`,
  };
  return <div style={style} className="divider_div"></div>;
}
