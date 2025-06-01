
const FloatingButton = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="fixed bottom-10 right-6 w-14 h-14 rounded-full bg-amber-50 text-white shadow-lg hover:bg-amber-200 transition-all cursor-pointer  flex items-center justify-center"
    >
      💬
    </button>
  );
};

export default FloatingButton;
