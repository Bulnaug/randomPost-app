export function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-xl bg-white rounded-2xl shadow-lg p-6">
        <h1 className="text-2xl font-bold mb-4 text-center">
          Random Post
        </h1>

        <p className="text-gray-700 text-center">
          Здесь будет показан один случайный пост
        </p>

        <div className="mt-6 flex justify-center gap-4">
          <button className="px-4 py-2 bg-black text-white rounded-xl">
            👍 Лайк
          </button>

          <button className="px-4 py-2 border rounded-xl">
            🔄 Другой пост
          </button>
        </div>
      </div>
    </div>
  );
}
