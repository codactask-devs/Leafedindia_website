import QnA from "./QnA";

const FAQ = () => {
    const questionsAndAnswers = [
        {
            question: "How do you calculate the shipping cost?",
            answer: "Our shipping costs are calculated based on factors such as shipping distance, delivery times, and volumetric weight. For businesses located out of the Klang Valley, our system will assist to compute the cost prior to checking out. For businesses located within the Klang Valley, there’s free shipping available for an order of more than RM1,000.",
        },
        {
            question: "What is the shelf life of your products?",
            answer: "Our packaging typically has a high shelf life of between 2-3 years if kept dry and in room condition. However, white paper may discolor and turn slightly yellowish over time especially if it’s exposed directly to the sunlight for a long period of time.",
        },
        {
            question: "Can I exchange the products if I purchase it wrongly? Do you return and refund?",
            answer: "Exchange is allowed subject to the stock’s availability. There will be a processing fee of RM30 imposed on each exchange.",
        },
        {
            question: "How long does it take for customers to receive their order after placing an order?",
            answer: "If the stocks are available, the shipment usually takes between 3-5 business days. Kindly contact your respective Sales Representative for customized orders.",
        },
        {
            question: "Is customization allowed?",
            answer: "Yes. Customized printing, structures, and dimensions are all allowed. Kindly contact your respective Sales Representative to find out more.",
        },
    ];

    return (
        <div id="faq" className="border bg-white border-gray-200 rounded-[32px] mb-20 md:mb-32 px-6 md:px-16 flex gap-10 md:gap-20  flex-col md:flex-row max-w-6xl mx-auto py-12 relative z-10">
            <section className="md:w-[45%] flex flex-col justify-between py-4">
                <nav>
                    <p className="text-[#0d6e41] font-bold mb-4 md:mb-2 uppercase tracking-widest text-sm">/ FAQ</p>
                    <h2 className="font-black text-[36px] md:text-[48px] leading-[1.1] mb-6 text-[#1a2b4b]">
                        Everything You Need to Know – Upfront
                    </h2>
                    <p className="text-gray-500 text-base md:text-lg mb-10 md:mb-0 leading-relaxed font-medium">
                        From logistics to custom printing and product care, here are quick answers to the most common questions we get from businesses choosing Leafedindia.
                    </p>
                </nav>

            </section>

            <section className="w-full">
                {questionsAndAnswers.map((qna) => (
                    <QnA key={qna.question} qna={qna} />
                ))}
            </section>
        </div>
    );
};

export default FAQ;
