interface Props {
  loader: JSX.Element;
}

const SpinnerWrapper = ({ loader }: Props) => {
  return (
    <div className="flex items-center justify-center absolute w-full h-full">
      {loader}
    </div>
  );
};

export default SpinnerWrapper;
