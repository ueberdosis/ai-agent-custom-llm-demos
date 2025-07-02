/**
 * Example initial content for the editor and prompts for different business use cases.
 */
export const businessUseCases = [
  {
    name: 'Sales Email Generator',
    editorContent: `
      <h1>Outreach Email Template</h1>
      <p>Hi {{first_name}},</p>
      <p>Congrats on {{recent_trigger}}! At {{company}}, you're likely focused on {{goal}}.</p>
      <p><strong>FlowMetrics</strong> helps {{role_plural}} like you by:<br>
      {{benefit_1}}<br>
      {{benefit_2}}<br>
      {{benefit_3}}</p>
      <p>Companies like {{reference_customer}} saw {{result}} in just {{timeframe}}.</p>
      <p>Would you be open to a brief call next week to explore how we can help {{company}} reach {{goal}}?</p>
      <p>Best,<br>Philip</p>
    `,
    prompt: `Replace every {{placeholder}} in the template above using the Lead Details here in the chat.

- Bold the key phrases (1-3 words) that directly addresses Sarah's pain points.
- Keep the email <120 words and friendly-consultative in tone.

Lead Details:

first_name: Sarah
company: Acme Logistics
recent_trigger: announcing a plan to cut operational costs by 15% in 2025
goal: reducing logistics spend without sacrificing service levels
role_plural: operations leaders
benefit_1: automating freight cost analysis workflows
benefit_2: providing real-time carrier performance insights
benefit_3: unifying data across TMS/ERP systems
reference_customer: Globex Corp
result: $1.2 M logistics savings
timeframe: 12 months

After replacing the placeholders, review the email. Rephrase each benefit in one sentence, like an expert sales copywriter, so that the end result is cohesive and flows well.
`,
  },
  {
    name: 'Cooking app',
    editorContent:
      '<h1>Welcome to our Cooking App</h1><p>Hello, welcome to our awesome app! We hope you guys will love it. Our aplication offers unique features that enhance your cooking experience. You can explore various cuisines and share your food momentts.</p><p>Hola, estamos emocionados de tenerte aquí. Our app is not just about recipes but also about building a community. We believe this will transform how you cook.</p><p>Please check out our cool fetures and enjoy cooking with us. Si tienes dudas, no dudes en preguntar.</p>',
    prompt: `Correct all spelling mistakes and grammar errors in the English text. Then, translate the text from Spanish to English. Next, identify the key phrases (2-3 words) in the text and format them in bold. Finally, add an example recipe with my favorite dish.`,
  },
  {
    name: 'Financial Report',
    editorContent: `
      <h1>Financial Report Overview</h1><p>This financial report provides an overview of the company's performance over the past quarter. Revenue increased by 15%, driven by strong sales in the North American market. However, operating expenses also rose due to increased marketing spend.</p>
      <p>Net income was $1.2 million, a decrease of 5% compared to the previous quarter. This decline is attributed to higher raw material costs and unfavorable exchange rates. The company is implementing cost-cutting measures to improve profitability in the coming months.</p>
      <p>Looking ahead, the company expects continued revenue growth but anticipates ongoing challenges related to supply chain disruptions and inflationary pressures. Management is focused on diversifying its supplier base and optimizing pricing strategies to mitigate these risks.</p>
    `,
    prompt: `Rewrite the report to be more concise and highlight the positive aspects. Focus on the revenue growth and downplay the net income decrease. Do not ask questions to the user, if you need extra information, make it up.`,
  },
  {
    name: 'Student Notes',
    editorContent: `
      <h1>Quantum Physics Notes</h1><p>Quantum physics is a branch of physics that deals with the behavior of matter and energy at the atomic and subatomic levels. It is based on the idea that energy is quantized, meaning it can only exist in discrete amounts.</p>
      <p>One of the key concepts in quantum physics is wave-particle duality, which states that particles can exhibit both wave-like and particle-like properties. This is demonstrated by the famous double-slit experiment, where electrons appear to behave as both waves and particles.</p>
      <p>Quantum physics has many applications in modern technology, including lasers, transistors, and medical imaging. It is also used to develop new materials and technologies, such as quantum computers.</p>
    `,
    prompt: `Summarize these notes into bullet points, focusing on the key concepts and applications of quantum physics. Make it easy for a high school student to understand.`,
  },
  {
    name: 'Research Paper',
    editorContent: `
      <h1>Gut Microbiome Research</h1><p>The role of the gut microbiome in human health has become increasingly evident in recent years (Smith et al., 2020). Studies have shown that the composition of the gut microbiome can influence a wide range of physiological processes, including immune function, metabolism, and brain health (Johnson et al., 2018; Brown et al., 2019).</p>
      <p>Dysbiosis, or an imbalance in the gut microbiome, has been linked to various diseases, such as inflammatory bowel disease (IBD), obesity, and type 2 diabetes (Lee et al., 2015; Kim et al., 2017). Understanding the mechanisms by which the gut microbiome influences these diseases is crucial for developing effective treatments.</p>
      <p>Further research is needed to fully elucidate the complex interactions between the gut microbiome and human health. Future studies should focus on identifying specific microbial species and their metabolites that contribute to disease pathogenesis. Additionally, clinical trials are needed to evaluate the efficacy of microbiome-based therapies for various diseases.</p>
    `,
    prompt: `Format the citations according to APA 7th edition guidelines. Add a section at the end with the references in APA format.`,
  },
  {
    name: 'Software Documentation',
    editorContent: `
      <h1>Software Documentation</h1><p>The <code>get_user_profile</code> function retrieves the user profile from the database. It takes the user ID as input and returns a dictionary containing the user's information, such as name, email, and address.</p>
      <p>The function first checks if the user ID is valid. If the user ID is invalid, the function raises a <code>ValueError</code> exception. Otherwise, the function queries the database for the user profile. If the user profile is not found, the function returns <code>None</code>.</p>
      <p>The function uses the <code>sqlalchemy</code> library to interact with the database. It first creates a session object, then uses the session object to query the database for the user profile. Finally, it closes the session object.</p>
    `,
    prompt: `Rewrite the documentation to be more concise and use more technical terms. Add a code example showing how to use the function.`,
  },
  {
    name: 'Travel Planner',
    editorContent: `
      <h1>Travel Planner Notes</h1><p>Day 1: Arrive in Paris and check into your hotel. In the afternoon, visit the Eiffel Tower and take a Seine River cruise. In the evening, have dinner at a traditional French bistro.</p>
      <p>Day 2: Visit the Louvre Museum and see the Mona Lisa. In the afternoon, explore the Latin Quarter and visit Notre Dame Cathedral. In the evening, attend a cabaret show at the Moulin Rouge.</p>
      <p>Day 3: Take a day trip to Versailles and tour the Palace of Versailles. In the evening, have a farewell dinner at a Michelin-starred restaurant.</p>
    `,
    prompt: `Add more details to the itinerary, including specific addresses, opening hours, and ticket prices. Suggest alternative activities for each day.`,
  },
  {
    name: 'Marketing Copywriter',
    editorContent: `
      <h1>Marketing Copywriter</h1><p>Our new product is a revolutionary solution that will change the way you work. It is designed to be easy to use and highly effective. With our product, you can achieve your goals faster and more efficiently.</p>
      <p>Our product is packed with features that will help you streamline your workflow and improve your productivity. It is also highly customizable, so you can tailor it to your specific needs. Our product is the perfect solution for businesses of all sizes.</p>
      <p>Don't miss out on this opportunity to transform your business. Order our product today and experience the difference. You won't be disappointed.</p>
    `,
    prompt: `Rewrite the product description to be more specific and persuasive. Highlight the key benefits of the product and use stronger calls to action. What problem does it solve? What are the key features?`,
  },
  {
    name: 'Empty document',
    editorContent: `<p></p>`,
    prompt: ``,
  },
]
