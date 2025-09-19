import React from "react";
import { Link } from "react-router-dom";
import NotFoundImage from "../../public/404image.webp"; // <-- adjust path

const NotFoundPage: React.FC = () => {
    return (
        <section className="py-2 xl:py-12">
            <div className="mx-auto w-full px-6 lg:px-28 mb-12">
                <div className="max-w-7xl mx-auto py-8 sm:py-12 sm:text-center">
                    <p className="mt-1 text-4xl font-bold text-neutral-main sm:text-5xl sm:tracking-tight lg:text-6xl">
                        Page not found<span className="text-5xl font-black text-indigo-500">.</span>
                    </p>
                    <p className="max-w-3xl mt-5 mx-auto lg:text-lg text-md text-neutral-secondary">
                        Did you try turning it off and on again?
                    </p>
                </div>
                <div className="flex justify-center">
                    <div className="box-border flex justify-center items-center relative w-96 h-96 bg-no-repeat bg-contain border-solid">
                        <img
                            src={NotFoundImage}
                            className="max-w-full max-h-full"
                            alt="404 illustration"
                        />
                    </div>
                </div>
                <div className="text-center mt-8">
                    <Link
                    to="/"
                    className="w-full rounded-2xl px-12 py-3 text-md font-normal transition hover:bg-indigo-500 bg-gray-700 text-main-neutral"
                    >
                        Go back home
                    </Link>
                </div>
            </div>    
        </section>
  );
};

export default NotFoundPage;