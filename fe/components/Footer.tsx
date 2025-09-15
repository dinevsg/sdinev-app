'use client'

export default function Example() {
  return (
    <section className="border-t border-gray-700">
        <div className="container flex flex-col items-center px-8 lg:py-6 py-8 mx-auto max-w-7xl sm:flex-row">
            <a href="{% url 'homepage' %}" className="text-2xl font-bold">
                <span>SDinev</span><span className="text-2xl font-black text-indigo-600">.</span>
            </a>        <p className="mt-4 text-sm sm:ml-4 sm:pl-4 sm:border-l sm:border-neutral-primary sm:mt-1">&copy; 2025
            </p>
            <span className="inline-flex justify-center mt-4 gap-4 lg:gap-0 lg:space-x-2 sm:ml-auto sm:mt-0 sm:justify-start">
                <a href="https://www.linkedin.com/in/sdinev/" target="_blank" className="text-neutral-primary hover:text-indigo-500 transiotion">
                    <span className="sr-only">Linkedin</span>
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-9 h-9" fill="currentColor" viewBox="0 0 64 64">
                        <path d="M40.227,12C51.145,12,52,12.854,52,23.773v16.453C52,51.145,51.145,52,40.227,52H23.773C12.855,52,12,51.145,12,40.227	V23.773C12,12.854,12.855,12,23.773,12H40.227z M25.029,43V26.728h-5.057V43H25.029z M22.501,24.401	c1.625,0,2.947-1.322,2.947-2.949c0-1.625-1.322-2.947-2.947-2.947c-1.629,0-2.949,1.32-2.949,2.947S20.87,24.401,22.501,24.401z M44,43v-8.925c0-4.382-0.946-7.752-6.067-7.752c-2.46,0-4.109,1.349-4.785,2.628H33.08v-2.223h-4.851V43h5.054v-8.05	c0-2.122,0.405-4.178,3.036-4.178c2.594,0,2.628,2.427,2.628,4.315V43H44z"></path>
                        </svg>
                </a>

                <a href="https://github.com/dinevsg" target="_blank" className="text-neutral-primary hover:text-indigo-500 transition">
                    <span className="sr-only">GitHub</span>
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8" fill="currentColor" viewBox="0 0 64 64">
                        <path d="M32,10c12.15,0,22,9.85,22,22c0,9.768-6.369,18.045-15.179,20.916c0.002-0.008,0.006-0.021,0.006-0.021	s-1.485-0.696-1.453-1.938c0.035-1.367,0-4.556,0-5.727c0-2.01-1.272-3.434-1.272-3.434s9.977,0.112,9.977-10.533	c0-4.107-2.147-6.245-2.147-6.245s1.128-4.385-0.39-6.245c-1.701-0.184-4.749,1.626-6.05,2.472c0,0-2.062-0.846-5.492-0.846	c-3.43,0-5.492,0.846-5.492,0.846c-1.301-0.846-4.348-2.656-6.05-2.472c-1.518,1.86-0.39,6.245-0.39,6.245s-2.147,2.137-2.147,6.245	c0,10.645,9.977,10.533,9.977,10.533s-1.005,1.136-1.225,2.806c-0.696,0.236-1.721,0.528-2.549,0.528	c-2.165,0-3.812-2.105-4.416-3.078c-0.595-0.96-1.815-1.766-2.953-1.766c-0.749,0-1.115,0.375-1.115,0.803s1.05,0.727,1.743,1.521	c1.461,1.674,1.435,5.438,6.641,5.438c0.565,0,1.719-0.139,2.588-0.256c-0.005,1.185-0.007,2.436,0.012,3.167	c0.031,1.242-1.453,1.938-1.453,1.938s0.004,0.012,0.006,0.021C16.369,50.045,10,41.768,10,32C10,19.85,19.85,10,32,10z"></path>
                        </svg>
                </a>

                <a href="http://x.com/dinevsg" target="_blank" className="text-neutral-primary hover:text-indigo-500 transition">
                    <span className="sr-only">X</span>
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-8" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M 2.3671875 3 L 9.4628906 13.140625 L 2.7402344 21 L 5.3808594 21 L 10.644531 14.830078 L 14.960938 21 L 21.871094 21 L 14.449219 10.375 L 20.740234 3 L 18.140625 3 L 13.271484 8.6875 L 9.2988281 3 L 2.3671875 3 z M 6.2070312 5 L 8.2558594 5 L 18.033203 19 L 16.001953 19 L 6.2070312 5 z"></path>
                        </svg>
                </a>
            </span>
        </div>
    </section>
  )
}
