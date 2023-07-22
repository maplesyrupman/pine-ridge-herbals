import Image from "next/image";
import AboutHeader from "@/components/about-header";
import Guarantee from "@/components/guarantee";

export default function About() {
    return (
        <div className='pt-18'>
            <AboutHeader />
            <div className='p-2 lg:p-36 flex items-center justify-center'>
                <div className="mx-auto mt-8 max-w-7xl px-6 sm:mt-0 lg:px-8">
                    <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-none">
                        <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Our mission</h2>
                        <div className="mt-6 flex flex-col gap-x-8 gap-y-20 lg:flex-row lg:relative">
                            <div className="lg:w-full lg:max-w-2xl lg:flex-auto">
                                <p className="text-xl leading-8 text-gray-600">
                                    At Pine Ridge Herbals, our mission is to provide high quality exceptional wildcrafted
                                    herbal products, expert consultations and educational tools that promote a deeper
                                    connection to Mother Earth. We strongly believe in the power of nature and strive to
                                    capture its essence through our handcrafted products.
                                </p>
                                <p className="mt-10 text-xl leading-8 text-gray-600">
                                    We are dedicated to providing
                                    resources and support to our community for the betterment of all living beings. With a
                                    deep respect for the environment and its ecosystems, we aim to make a positive impact
                                    on the world by preserving the natural beauty of our planet while offering the healing
                                    properties of plant medicine to all who seek it.. At Pine Ridge Herbals, we are
                                    committed to fostering a harmonious relationship with Mother Nature and sharing that
                                    connection with the world.
                                </p>
                            </div>
                            <div className="lg:relative bottom-20">
                                <div>
                                    <Image src='/logo.jpg' width={500} height={500} alt='mission' />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="mt-32 sm:mt-40 lg:my-0 xl:mx-auto xl:max-w-7xl xl:px-8">
                        <Image
                            src="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2832&q=80"
                            alt=""
                            className="aspect-[5/2] w-full object-cover xl:rounded-3xl"
                            width={2832}
                            height={1416}
                        />
                    </div>

                    <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-none mt-32 ">
                        <div className="mt-6 flex flex-col gap-x-8 gap-y-20 lg:flex-row lg:relative">
                            <div>
                                <Image src='/logo.jpg' width={500} height={500} alt='mission' />
                            </div>
                            <div className="lg:w-full lg:max-w-2xl lg:flex lg:flex-col gap-10">
                                <p className="text-xl leading-8 text-gray-600">
                                    Our journey began with a desire to create products that not only nourish the body and
                                    support healing but also honor the natural environment. We started by foraging for wild
                                    herbs and carefully harvesting them by hand, using sustainable practices that respect
                                    the delicate balance of nature. Many products on the market do not align with our vision
                                    of true natural products, made from the earth for human well-being. We have a saying
                                    here “If you can't eat it, then don't put it on your skin”
                                </p>
                                <p className="text-xl leading-8 text-gray-600">
                                    As we spent more time in the natural world, we became increasingly inspired by the
                                    deep connection between plants and their environment. We learned that every plant has
                                    a unique role to play in its ecosystem and that by respecting and protecting that
                                    ecosystem, we can support the health and vitality of all living beings.
                                </p>
                                <p className="text-xl leading-8 text-gray-600">
                                    As we learned more about the medicinal properties of plants, we became increasingly
                                    inspired by their ability to promote healing and wellness. We believe that the natural
                                    world offers us everything we need to thrive, and we are committed to sharing that
                                    knowledge with others.
                                </p>
                                <p className="text-xl leading-8 text-gray-600">
                                    From our healing salves and luxurious oils to our custom remedies, each product is
                                    crafted with love and reverence for the plants that have given us so much. We use only
                                    the finest ingredients, including organic and locally sourced herbs, and our recipes are
                                    expertly formulated to promote balance and vitality.
                                </p>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
            <Guarantee />
        </div>
    )
}