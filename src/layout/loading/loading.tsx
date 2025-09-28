import strings from '@/utils/strings';

function Loading() {
  {
    return (
      <div className="fixed left-0 right-0 top-0 bottom-0 bg-black flex justify-center items-center z-10">
        <p>{strings.loading}</p>
      </div>
    );
  }
}

export default Loading;
