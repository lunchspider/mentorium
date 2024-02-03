export default function ShowcaseProject() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-4xl font-bold tracking-tight text-center md:text-5xl lg:text-6xl">
        Generative Models
      </h1>
      <div className="grid grid-cols-1 gap-6 p-6 md:grid-cols-2 lg:grid-cols-4">
        <div className="flex flex-col items-center justify-center p-6 bg-gray-100 rounded-lg shadow-md dark:bg-gray-800">
          <h2 className="text-xl font-bold tracking-tight">GANs</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Generative Adversarial Networks
          </p>
        </div>
        <div className="flex flex-col items-center justify-center p-6 bg-gray-100 rounded-lg shadow-md dark:bg-gray-800">
          <h2 className="text-xl font-bold tracking-tight">VAEs</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Variational Autoencoders
          </p>
        </div>
        <div className="flex flex-col items-center justify-center p-6 bg-gray-100 rounded-lg shadow-md dark:bg-gray-800">
          <h2 className="text-xl font-bold tracking-tight">RNNs</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Recurrent Neural Networks
          </p>
        </div>
        <div className="flex flex-col items-center justify-center p-6 bg-gray-100 rounded-lg shadow-md dark:bg-gray-800">
          <h2 className="text-xl font-bold tracking-tight">CNNs</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Convolutional Neural Networks
          </p>
        </div>
      </div>
    </main>
  );
}
