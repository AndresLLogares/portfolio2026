import { colorSchema } from "../components/MyJourney";

export const personalInfo = {
  name: 'Andres Luis Logares',
  title: 'Developer',
  tagline: 'Construyendo experiencias web excepcionales',
  bio: 'Desarrollador apasionado por crear soluciones elegantes y eficientes. Especializado en tecnologías modernas y diseño minimalista.',
  email: 'andresl940@hotmail.com',
  location: 'Tu Ciudad, País',
  social: {
    github: 'https://github.com/AndresLLogares',
    linkedin: 'https://www.linkedin.com/in/andr%C3%A9s-luis-logares-522595172/',
    whatsapp: 'https://wa.me/5491136005563',
  },
};

export const ButtonsInfo = {
  aboutMe: "About Me",
  myJourney: "My Journey",
  professionalEthos: "Professional Ethos",
  contactMe: "Contact Me",
}

export const AboutMeInfo = {
  info: 'I am a programmer with a strong track record in developing efficient and innovative technological solutions, driven by a passion for continuous learning and exploring emerging fields like <strong>Artificial Intelligence (AI)</strong>. My career has evolved from my beginnings as a self-taught full-stack developer focused on freelance and Web3 projects, to becoming a specialized professional within the <strong>Financial Technology (FinTech)</strong> sector.',
  info_2: 'Currently, I leverage my skills within the banking environment, where I have consolidated my experience in the comprehensive management of the software development lifecycle. I operate effectively in creating autonomous projects using robust technologies like <strong>.NET</strong>, and integrating complex systems via <strong>XML</strong>, <strong>Back-Office</strong> tools, and modern front-end frameworks such as <strong>React</strong>.',
  info_3: 'My expertise includes the implementation of crucial security facets vital for financial environments. I possess practical command of <strong>DevOps</strong> methodologies, including project deployment via tools such as <strong>Jenkins</strong>.',
  info_4: 'With a solid foundation in development and delivery, I am results-oriented, driven to tackle complex challenges and deliver high-impact results that boost operational efficiency and innovation within the banking industry.',
}

export const timelineEvents = [
  {
    time: "JULY 2023 | PRESENT", title: 'ACCENTURE',
    description: 'Key contributor within the Investment Tribe of a major banking client, responsible for the end-to-end development of critical financial applications and back-office systems.',
    description_2: 'Engineered robust full-stack solutions utilizing React for dynamic front-ends, and .NET alongside Nest.js for secure, high-performance back-end services.',
    description_3: 'Managed the complete CI/CD lifecycle, deploying projects to production environments using Jenkins, ensuring secure, automated, and reliable releases.',
    description_4: 'Collaborate closely with stakeholders to gather requirements, provide innovative technical suggestions, and accelerate development processes while maintaining rigorous security standards.',
    description_5: `Dedicated to technical excellence, security, and ethics, driving project success as a key team member embedded within the client's operations.`,
    color: colorSchema[0]
  },
  {
    time: 'APRIL 2022 | JULY 2023', title: 'ALT', 
    description: 'Led the modernization of self-service terminal, transitioning from a legacy system to a modern user interface developed with React.',
    description_2: 'Engineered a secure application that integrated with key hardware and backend systems.',
    description_3: 'Implemented robust security protocols and data validation mechanisms to protect sensitive information, adhering to industry compliance standards.',
    description_4: 'Collaborated closely with cross-functional teams to ensure a smooth transition, significantly enhancing operational efficiency and user experience.',
    description_5: 'Actively participated in defining the software architecture, implementation, and rigorous testing phases of the new platform, guaranteeing system quality and performance.',
    color: colorSchema[0]
  },
  {
    time: "MARCH 2021 | MAY 2022", title: 'OCTOSOFT',
    description: 'Designed and developed feature-rich Web3 client applications using React, adhering to company standards and delivering high-quality code in the fintech sector.',
    description_2: 'Specialized in blockchain integrations, working closely with project managers and creative teams to deliver tailored solutions for NFT galleries and related business pitch decks.',
    description_3: 'Contributed to the design, structure, and implementation of new dApps (decentralized applications), as well as maintaining and updating existing web platforms with EVM connectivity.',
    description_4: 'Developed robust back-end solutions using Node.js to create specialized libraries for integrating Ethereum smart contracts.',
    description_5: 'Actively participated in weekly progress meetings, aligning efforts with team goals and driving project advancements in the blockchain space.',
    color: colorSchema[0]
  },
  // ...other events
];

export const professionalEthos = {
  ethos_1: 'I am a results-oriented Full-Stack Software Engineer driven by developing secure, innovative technological solutions within high-demand environments, specifically the banking and fintech sectors. My professional ethos is centered on delivering high-quality code, comprehensive security, and effective collaboration.',
  ethos_2: 'My experience spans from developing dApps and integrating smart contracts using React and Node.js, to modernizing critical banking systems with React, .NET, and Nest.js. I specialize in managing the complete application lifecycle, including automating deployments to production using Jenkins.',
  ethos_3: 'I firmly believe in adaptability and continuous learning, often leveraging AI and emerging technologies to optimize workflows and enhance product delivery. This approach allows me to successfully navigate different teams and technologies to overcome complex business challenges.',
  ethos_4: 'In every project, my goal is to transform processes and experiences, delivering tangible value to users while ensuring technical excellence and ethical practice in every line of code.',
}
