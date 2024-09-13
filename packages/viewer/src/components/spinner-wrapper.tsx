interface Props {
  loader: JSX.Element;
}

const SpinnerWrapper = ({ loader }: Props) => {
  return (
    <div className="flex items-center justify-center absolute top-0 right-0 bottom-0 left-0">
      {loader}
    </div>
  );
};

export default SpinnerWrapper;
