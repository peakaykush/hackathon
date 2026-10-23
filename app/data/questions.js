/**
 * AZ-900 Question Bank
 * Based on the official AZ-900 skills outline from Microsoft Learn.
 * All questions are original and unofficial - written for study purposes.
 * 
 * Topics:
 * 1. Cloud Concepts (25-30%)
 * 2. Azure Architecture and Services (35-40%)
 * 3. Azure Management and Governance (30-35%)
 */

export const TOPICS = [
  {
    id: 'cloud-concepts',
    name: 'Cloud Concepts',
    weight: '25–30%',
    icon: 'CC',
    iconClass: 'cloud',
    description: 'Cloud computing fundamentals, benefits of cloud services, and cloud service types (IaaS, PaaS, SaaS).',
    subtopics: ['Cloud Computing', 'Benefits of Cloud Services', 'Cloud Service Types']
  },
  {
    id: 'azure-architecture',
    name: 'Azure Architecture & Services',
    weight: '35–40%',
    icon: 'AS',
    iconClass: 'arch',
    description: 'Core Azure components, compute & networking, storage services, and identity & security.',
    subtopics: ['Core Architecture', 'Compute & Networking', 'Storage Services', 'Identity & Security']
  },
  {
    id: 'azure-management',
    name: 'Azure Management & Governance',
    weight: '30–35%',
    icon: 'MG',
    iconClass: 'mgmt',
    description: 'Cost management, governance tools, resource deployment, and monitoring in Azure.',
    subtopics: ['Cost Management', 'Governance & Compliance', 'Resource Deployment', 'Monitoring Tools']
  }
];

export const QUESTIONS = [
  // =====================================================
  // TOPIC 1: CLOUD CONCEPTS (25-30%)
  // =====================================================

  // -- Cloud Computing --
  {
    id: 'cc-1',
    topic: 'cloud-concepts',
    subtopic: 'Cloud Computing',
    difficulty: 'easy',
    question: 'What is cloud computing?',
    options: [
      'A technology for building mobile applications only',
      'The delivery of computing services over the internet, including servers, storage, databases, and networking',
      'A way to store files exclusively on a local hard drive',
      'A programming language used for web development'
    ],
    correctIndex: 1,
    explanation: 'Cloud computing is the delivery of computing services — including servers, storage, databases, networking, software, analytics, and intelligence — over the internet ("the cloud") to offer faster innovation, flexible resources, and economies of scale.',
    tip: 'Think of cloud computing as renting IT resources instead of buying them. Like how Safaricom\'s M-Pesa runs on cloud infrastructure to handle millions of mobile money transactions across Africa.'
  },
  {
    id: 'cc-2',
    topic: 'cloud-concepts',
    subtopic: 'Cloud Computing',
    difficulty: 'medium',
    question: 'In the shared responsibility model, which responsibility always remains with the customer regardless of the cloud service type?',
    options: [
      'Physical security of the datacenter',
      'Network controls and firewall configuration',
      'Information and data, plus devices that connect to the cloud',
      'Operating system patching and maintenance'
    ],
    correctIndex: 2,
    explanation: 'In the shared responsibility model, the customer is always responsible for their information and data, devices (mobile, PCs), and accounts and identities. The cloud provider is always responsible for the physical datacenter, physical network, and physical hosts.',
    tip: 'Remember: "Your data, your responsibility." Even if a bank stores your money, it\'s still your money — you decide how to use it.'
  },
  {
    id: 'cc-3',
    topic: 'cloud-concepts',
    subtopic: 'Cloud Computing',
    difficulty: 'easy',
    question: 'Which cloud model uses a combination of public and private clouds, allowing data and applications to be shared between them?',
    options: [
      'Public cloud',
      'Private cloud',
      'Hybrid cloud',
      'Community cloud'
    ],
    correctIndex: 2,
    explanation: 'A hybrid cloud is a computing environment that combines a public cloud and a private cloud by allowing data and applications to be shared between them. This gives businesses greater flexibility and more deployment options.',
    tip: 'Think of a hybrid cloud like having both a generator (private) and grid power (public) for your business. You use the generator for critical loads and grid power for everything else.'
  },
  {
    id: 'cc-4',
    topic: 'cloud-concepts',
    subtopic: 'Cloud Computing',
    difficulty: 'medium',
    question: 'Which of the following is a characteristic of the consumption-based model in cloud computing?',
    options: [
      'You pay a fixed monthly fee regardless of usage',
      'You must purchase hardware upfront before using cloud services',
      'You only pay for the resources you actually use',
      'You are locked into a minimum three-year contract'
    ],
    correctIndex: 2,
    explanation: 'The consumption-based model means you only pay for the cloud resources you use. This helps you plan and manage your operating costs, run your infrastructure more efficiently, and scale as your business needs change.',
    tip: 'It\'s like paying for electricity — you only pay for the units you consume. No upfront cost for building a power plant!'
  },
  {
    id: 'cc-5',
    topic: 'cloud-concepts',
    subtopic: 'Cloud Computing',
    difficulty: 'hard',
    question: 'A company wants full control over its cloud environment and does not want to share physical hardware with other organisations. They also want the cloud hosted in their own datacenter. Which cloud model best fits?',
    options: [
      'Public cloud',
      'Private cloud',
      'Hybrid cloud',
      'Multi-cloud'
    ],
    correctIndex: 1,
    explanation: 'A private cloud provides full control over resources and security. It can be hosted in the organisation\'s own datacenter (on-premises) or by a third-party provider. Unlike a public cloud, the hardware is not shared with other organisations.',
    tip: 'A private cloud is like owning your own apartment building versus renting a room in a shared building. You get all the space and control, but you bear all the costs.'
  },
  {
    id: 'cc-6',
    topic: 'cloud-concepts',
    subtopic: 'Cloud Computing',
    difficulty: 'medium',
    question: 'Which pricing model requires no upfront costs and charges based on actual resource usage?',
    options: [
      'Capital Expenditure (CapEx)',
      'Operational Expenditure (OpEx)',
      'Reserved Instance pricing',
      'Spot pricing'
    ],
    correctIndex: 1,
    explanation: 'Operational Expenditure (OpEx) is spending money on services or products now and being billed for them now. There is no upfront cost — you pay for a service or product as you use it. Cloud computing falls under OpEx because you pay based on usage.',
    tip: 'CapEx = buying a car outright. OpEx = using Uber or Bolt. With cloud, you\'re "Ubering" your IT infrastructure!'
  },
  {
    id: 'cc-7',
    topic: 'cloud-concepts',
    subtopic: 'Cloud Computing',
    difficulty: 'easy',
    question: 'Which cloud deployment model offers services to anyone who wants to purchase them, with resources owned and operated by a third-party provider?',
    options: [
      'Public cloud',
      'Private cloud',
      'Hybrid cloud',
      'On-premises'
    ],
    correctIndex: 0,
    explanation: 'A public cloud is owned and operated by a third-party cloud service provider, which delivers computing resources like servers and storage over the internet. With a public cloud, all hardware, software, and other supporting infrastructure is owned and managed by the cloud provider.',
    tip: 'The public cloud is like public transport — anyone can use it, you share the ride, and you only pay for your journey.'
  },
  {
    id: 'cc-8',
    topic: 'cloud-concepts',
    subtopic: 'Cloud Computing',
    difficulty: 'medium',
    question: 'What does "serverless" computing mean in cloud computing?',
    options: [
      'There are literally no servers involved in the process',
      'The cloud provider manages the server infrastructure, and the developer focuses only on code execution',
      'It uses only containers without any virtual machines',
      'It eliminates the need for any backend processing'
    ],
    correctIndex: 1,
    explanation: 'Serverless computing doesn\'t mean there are no servers. It means the cloud provider automatically manages the server infrastructure. Developers focus solely on writing and deploying code, while the provider handles provisioning, scaling, and maintenance of the servers.',
    tip: 'Serverless is like eating at a restaurant — there\'s definitely a kitchen (server) behind the scenes, but you don\'t need to worry about cooking, cleaning, or restocking ingredients. You just order!'
  },

  // -- Benefits of Cloud Services --
  {
    id: 'cc-9',
    topic: 'cloud-concepts',
    subtopic: 'Benefits of Cloud Services',
    difficulty: 'easy',
    question: 'Which cloud benefit ensures that a service remains available even when component failures occur?',
    options: [
      'Scalability',
      'Elasticity',
      'High availability',
      'Agility'
    ],
    correctIndex: 2,
    explanation: 'High availability focuses on ensuring maximum availability regardless of disruptions or events that may occur. Azure SLAs (Service Level Agreements) define uptime guarantees, often expressed as 99.9% or 99.99%.',
    tip: 'High availability is like how M-Pesa stays running 24/7, even during peak times like payday. It\'s designed to keep working even when parts of the system have issues.'
  },
  {
    id: 'cc-10',
    topic: 'cloud-concepts',
    subtopic: 'Benefits of Cloud Services',
    difficulty: 'medium',
    question: 'What is the difference between scalability and elasticity in cloud computing?',
    options: [
      'They mean exactly the same thing',
      'Scalability refers to adding resources manually, while elasticity refers to automatic scaling based on demand',
      'Scalability is the ability to increase resources, while elasticity is the ability to automatically adjust resources to match demand fluctuations',
      'Scalability is for storage only, elasticity is for compute only'
    ],
    correctIndex: 2,
    explanation: 'Scalability is the ability to add more resources to handle increased load (either vertically by adding power, or horizontally by adding instances). Elasticity goes further — it\'s the ability to automatically scale resources up or down based on current demand.',
    tip: 'Scalability = a matatu getting a bigger engine (vertical) or adding more vehicles to a route (horizontal). Elasticity = automatically adding more matatus during rush hour and removing them when it\'s quiet.'
  },
  {
    id: 'cc-11',
    topic: 'cloud-concepts',
    subtopic: 'Benefits of Cloud Services',
    difficulty: 'easy',
    question: 'Which cloud benefit allows a business to deploy resources in minutes rather than weeks?',
    options: [
      'Reliability',
      'Security',
      'Agility',
      'Predictability'
    ],
    correctIndex: 2,
    explanation: 'Agility in cloud computing means the ability to rapidly develop, test, and deploy cloud-based applications. Cloud environments can be provisioned in minutes, enabling faster time to market and rapid iteration.',
    tip: 'Agility in the cloud is like ordering food on Jumia Food — you get it fast without having to go to the market, buy ingredients, and cook yourself.'
  },
  {
    id: 'cc-12',
    topic: 'cloud-concepts',
    subtopic: 'Benefits of Cloud Services',
    difficulty: 'medium',
    question: 'Which cloud benefit helps ensure consistent performance and cost forecasting?',
    options: [
      'Agility',
      'Predictability',
      'Elasticity',
      'Governance'
    ],
    correctIndex: 1,
    explanation: 'Predictability in the cloud can be focused on performance predictability or cost predictability. Performance predictability includes autoscaling and load balancing. Cost predictability includes tracking resource usage in real time, monitoring resources, and applying data analytics to find patterns.',
    tip: 'Predictability is like having a prepaid electricity meter — you know exactly how much you\'re spending and can forecast future costs.'
  },
  {
    id: 'cc-13',
    topic: 'cloud-concepts',
    subtopic: 'Benefits of Cloud Services',
    difficulty: 'easy',
    question: 'Which cloud benefit refers to the ability to deploy resources across multiple regions worldwide?',
    options: [
      'Reliability',
      'Global reach',
      'Governance',
      'Manageability'
    ],
    correctIndex: 1,
    explanation: 'Global reach means you can deploy resources in Azure regions around the world, bringing your applications closer to users wherever they are. This reduces latency and improves the user experience.',
    tip: 'Global reach is like Flutterwave processing payments across Africa and beyond — the infrastructure is spread globally to serve users wherever they are.'
  },

  // -- Cloud Service Types --
  {
    id: 'cc-14',
    topic: 'cloud-concepts',
    subtopic: 'Cloud Service Types',
    difficulty: 'easy',
    question: 'Which cloud service type gives you the most control over the cloud resources, including virtual machines, networking, and storage?',
    options: [
      'Software as a Service (SaaS)',
      'Platform as a Service (PaaS)',
      'Infrastructure as a Service (IaaS)',
      'Function as a Service (FaaS)'
    ],
    correctIndex: 2,
    explanation: 'Infrastructure as a Service (IaaS) gives you the most control and flexibility. You rent IT infrastructure — servers, virtual machines, storage, networks — from a cloud provider on a pay-as-you-go basis. You manage the operating system, middleware, and applications.',
    tip: 'IaaS is like renting an empty office space — you get the building, but you bring your own furniture, equipment, and staff.'
  },
  {
    id: 'cc-15',
    topic: 'cloud-concepts',
    subtopic: 'Cloud Service Types',
    difficulty: 'medium',
    question: 'A company wants to deploy a web application without managing the underlying infrastructure, operating system patches, or runtime updates. Which cloud service type should they use?',
    options: [
      'IaaS',
      'PaaS',
      'SaaS',
      'On-premises'
    ],
    correctIndex: 1,
    explanation: 'Platform as a Service (PaaS) provides an environment for building, testing, and deploying software applications. The cloud provider manages the underlying infrastructure, OS, and middleware, while you focus on your application and data.',
    tip: 'PaaS is like using a co-working space like iHub in Nairobi — the desks, internet, power, and security are all provided. You just show up and work on your project.'
  },
  {
    id: 'cc-16',
    topic: 'cloud-concepts',
    subtopic: 'Cloud Service Types',
    difficulty: 'easy',
    question: 'Microsoft 365 (Office 365) and Salesforce are examples of which cloud service type?',
    options: [
      'IaaS',
      'PaaS',
      'SaaS',
      'Hybrid cloud'
    ],
    correctIndex: 2,
    explanation: 'Software as a Service (SaaS) provides a complete software solution that you purchase on a pay-as-you-go basis. You use the application over the internet, and the provider manages everything from infrastructure to updates.',
    tip: 'SaaS is like subscribing to Netflix or Showmax — you just use the service. You don\'t worry about building the app or running the servers.'
  },
  {
    id: 'cc-17',
    topic: 'cloud-concepts',
    subtopic: 'Cloud Service Types',
    difficulty: 'hard',
    question: 'A startup is building a mobile app and needs a database, identity management, and push notifications without managing any servers. They want to write only the app code. Which combination of cloud service types is most appropriate?',
    options: [
      'IaaS for all components',
      'PaaS for the backend services, SaaS for identity management',
      'SaaS for the database, IaaS for identity',
      'On-premises for the database, PaaS for the app'
    ],
    correctIndex: 1,
    explanation: 'PaaS provides managed database services and push notification services, allowing the startup to focus on app code without managing infrastructure. SaaS identity providers (like Microsoft Entra ID) handle user authentication as a service.',
    tip: 'This is a common pattern for African tech startups — use PaaS for backends (like Azure App Service) and SaaS for authentication. Chipper Cash and similar fintechs use this approach to scale fast.'
  },

  // =====================================================
  // TOPIC 2: AZURE ARCHITECTURE AND SERVICES (35-40%)
  // =====================================================

  // -- Core Architecture --
  {
    id: 'aa-1',
    topic: 'azure-architecture',
    subtopic: 'Core Architecture',
    difficulty: 'easy',
    question: 'What is an Azure region?',
    options: [
      'A single datacenter in a specific country',
      'A set of datacenters deployed within a latency-defined perimeter and connected through a dedicated low-latency network',
      'A virtual network that spans multiple continents',
      'A management group that contains multiple subscriptions'
    ],
    correctIndex: 1,
    explanation: 'An Azure region is a set of datacenters, deployed within a latency-defined perimeter and connected through a dedicated regional low-latency network. Azure has more global regions than any other cloud provider.',
    tip: 'Azure has a region in South Africa (Johannesburg and Cape Town) — making it faster for users across the continent. This is why Azure services feel responsive when used locally.'
  },
  {
    id: 'aa-2',
    topic: 'azure-architecture',
    subtopic: 'Core Architecture',
    difficulty: 'medium',
    question: 'What are Azure availability zones?',
    options: [
      'Separate Azure subscriptions for different departments',
      'Physically separate datacenters within an Azure region, each with independent power, cooling, and networking',
      'Different pricing tiers for Azure services',
      'Geographic areas containing one or more Azure regions'
    ],
    correctIndex: 1,
    explanation: 'Availability zones are physically separate datacenters within an Azure region. Each availability zone has independent power, cooling, and networking. They are designed to protect applications and data from datacenter failures.',
    tip: 'Think of availability zones like having backup generators in different buildings. If one building loses power, the others keep running.'
  },
  {
    id: 'aa-3',
    topic: 'azure-architecture',
    subtopic: 'Core Architecture',
    difficulty: 'easy',
    question: 'What is an Azure resource group?',
    options: [
      'A collection of Azure regions',
      'A container that holds related Azure resources for a solution',
      'A type of virtual machine',
      'A billing subscription'
    ],
    correctIndex: 1,
    explanation: 'A resource group is a container that holds related resources for an Azure solution. It includes those resources that you want to manage as a group. You can apply access control, policies, and tags at the resource group level.',
    tip: 'A resource group is like a project folder on your computer — you put all related files together so you can manage them as a unit.'
  },
  {
    id: 'aa-4',
    topic: 'azure-architecture',
    subtopic: 'Core Architecture',
    difficulty: 'medium',
    question: 'What is the correct hierarchy of Azure organizational structure from broadest to most specific?',
    options: [
      'Resource Groups → Subscriptions → Management Groups → Resources',
      'Management Groups → Subscriptions → Resource Groups → Resources',
      'Subscriptions → Management Groups → Resource Groups → Resources',
      'Resources → Resource Groups → Management Groups → Subscriptions'
    ],
    correctIndex: 1,
    explanation: 'The Azure hierarchy from broadest to most specific is: Management Groups → Subscriptions → Resource Groups → Resources. Management groups help you manage access, policy, and compliance across multiple subscriptions.',
    tip: 'Think of it like a company structure: Corporation (Management Group) → Departments (Subscriptions) → Teams (Resource Groups) → Employees (Resources).'
  },
  {
    id: 'aa-5',
    topic: 'azure-architecture',
    subtopic: 'Core Architecture',
    difficulty: 'hard',
    question: 'What are sovereign regions in Azure?',
    options: [
      'Regions that are more expensive than standard regions',
      'Regions reserved exclusively for large enterprises',
      'Instances of Azure isolated from the main Azure cloud to meet specific compliance and legal requirements',
      'Regions that only support Linux-based virtual machines'
    ],
    correctIndex: 2,
    explanation: 'Sovereign regions are instances of Azure that are isolated from the main instance. You may need to use a sovereign region for compliance or legal purposes. Examples include Azure Government (US) and Azure China (operated by 21Vianet).',
    tip: 'Sovereign regions exist because some governments require data to stay within specific boundaries with strict access controls — like a VIP-only section in a building.'
  },
  {
    id: 'aa-6',
    topic: 'azure-architecture',
    subtopic: 'Core Architecture',
    difficulty: 'medium',
    question: 'What is the purpose of Azure region pairs?',
    options: [
      'To provide load balancing across regions',
      'To ensure data residency within a geographic boundary and provide automatic failover during outages',
      'To offer discounted pricing for resources deployed in pairs',
      'To enable cross-region virtual network peering'
    ],
    correctIndex: 1,
    explanation: 'Each Azure region is paired with another region within the same geography, at least 300 miles away. This ensures data residency is maintained within the geography and provides automatic failover, priority recovery during outages, and sequential updates to minimise downtime.',
    tip: 'Region pairs are like having a backup office in another city — if a natural disaster hits one office, the other one takes over.'
  },

  // -- Compute and Networking --
  {
    id: 'aa-7',
    topic: 'azure-architecture',
    subtopic: 'Compute & Networking',
    difficulty: 'easy',
    question: 'Which Azure service provides on-demand, scalable virtual machines in the cloud?',
    options: [
      'Azure Functions',
      'Azure Virtual Machines',
      'Azure App Service',
      'Azure Kubernetes Service'
    ],
    correctIndex: 1,
    explanation: 'Azure Virtual Machines (VMs) let you create and use virtual machines in the cloud. VMs provide Infrastructure as a Service (IaaS) and can be used to run any workload — from development to production.',
    tip: 'Azure VMs are like renting a fully customizable computer in the cloud — you choose the CPU, RAM, and storage, and install whatever operating system and software you need.'
  },
  {
    id: 'aa-8',
    topic: 'azure-architecture',
    subtopic: 'Compute & Networking',
    difficulty: 'medium',
    question: 'What is Azure Virtual Machine Scale Sets?',
    options: [
      'A tool for monitoring VM performance',
      'A service that lets you create and manage a group of identical, load-balanced VMs that automatically increase or decrease in number',
      'A backup solution for virtual machines',
      'A pricing model for purchasing VMs in bulk'
    ],
    correctIndex: 1,
    explanation: 'Azure Virtual Machine Scale Sets let you create and manage a group of identical, load-balanced VMs. The number of VM instances can automatically increase or decrease in response to demand or a defined schedule, ensuring your applications are highly available.',
    tip: 'VM Scale Sets are like having a fleet of delivery motorbikes — during peak hours, more riders are added; during off-peak, some go home. Demand drives the fleet size.'
  },
  {
    id: 'aa-9',
    topic: 'azure-architecture',
    subtopic: 'Compute & Networking',
    difficulty: 'medium',
    question: 'Which Azure compute option is best suited for running event-driven code without managing infrastructure?',
    options: [
      'Azure Virtual Machines',
      'Azure Container Instances',
      'Azure Functions',
      'Azure Virtual Desktop'
    ],
    correctIndex: 2,
    explanation: 'Azure Functions is a serverless compute service that lets you run event-triggered code without having to provision or manage infrastructure. You pay only for the compute time you consume, and it scales automatically.',
    tip: 'Azure Functions is like hiring a freelancer for specific tasks — they only work (and get paid) when there\'s work to do, and you don\'t need to provide them an office.'
  },
  {
    id: 'aa-10',
    topic: 'azure-architecture',
    subtopic: 'Compute & Networking',
    difficulty: 'easy',
    question: 'What is Azure App Service?',
    options: [
      'A service for running containerised applications',
      'An HTTP-based service for hosting web applications, REST APIs, and mobile backends',
      'A tool for managing Azure subscriptions',
      'A database management service'
    ],
    correctIndex: 1,
    explanation: 'Azure App Service is an HTTP-based service for hosting web applications, REST APIs, and mobile backends. It supports multiple programming languages and offers features like auto-scaling, CI/CD, and SSL certificates.',
    tip: 'Azure App Service is like using Heroku or Railway — you deploy your code and the platform handles the servers, scaling, and security.'
  },
  {
    id: 'aa-11',
    topic: 'azure-architecture',
    subtopic: 'Compute & Networking',
    difficulty: 'medium',
    question: 'What is the primary purpose of Azure Virtual Network (VNet)?',
    options: [
      'To store data in the cloud',
      'To provide a private network environment in Azure where resources can communicate securely',
      'To run serverless functions',
      'To manage user identities'
    ],
    correctIndex: 1,
    explanation: 'Azure Virtual Network (VNet) enables Azure resources to securely communicate with each other, the internet, and on-premises networks. VNets provide isolation, segmentation, and communication for your Azure resources.',
    tip: 'A VNet is like a private compound with its own roads and security — resources inside can talk to each other safely, and you control who gets in and out.'
  },
  {
    id: 'aa-12',
    topic: 'azure-architecture',
    subtopic: 'Compute & Networking',
    difficulty: 'hard',
    question: 'Which Azure service provides a dedicated private connection between an on-premises datacenter and Azure, bypassing the public internet?',
    options: [
      'Azure VPN Gateway',
      'Azure ExpressRoute',
      'Azure DNS',
      'Azure Bastion'
    ],
    correctIndex: 1,
    explanation: 'Azure ExpressRoute lets you extend your on-premises networks into the Microsoft cloud over a private connection facilitated by a connectivity provider. It doesn\'t go over the public internet, offering more reliability, faster speeds, consistent latencies, and higher security.',
    tip: 'ExpressRoute is like having a private highway between your office and Azure\'s datacenter — no traffic jams (internet congestion), no detours, and much more secure.'
  },
  {
    id: 'aa-13',
    topic: 'azure-architecture',
    subtopic: 'Compute & Networking',
    difficulty: 'easy',
    question: 'What is the difference between a public endpoint and a private endpoint in Azure?',
    options: [
      'Public endpoints are free, private endpoints cost extra',
      'Public endpoints are accessible over the internet, while private endpoints are accessible only within a virtual network',
      'Public endpoints are faster than private endpoints',
      'Private endpoints are used only for storage, while public endpoints are used for compute'
    ],
    correctIndex: 1,
    explanation: 'A public endpoint is accessible over the internet from anywhere. A private endpoint provides a secure connection to an Azure service through a private IP address within your virtual network, keeping traffic off the public internet.',
    tip: 'Public endpoint = a shop on a main road anyone can visit. Private endpoint = a members-only club accessed through a private entrance.'
  },

  // -- Storage Services --
  {
    id: 'aa-14',
    topic: 'azure-architecture',
    subtopic: 'Storage Services',
    difficulty: 'easy',
    question: 'Which Azure storage service provides massively scalable object storage for unstructured data like images and videos?',
    options: [
      'Azure Table Storage',
      'Azure Blob Storage',
      'Azure File Storage',
      'Azure Queue Storage'
    ],
    correctIndex: 1,
    explanation: 'Azure Blob Storage is optimized for storing massive amounts of unstructured data, such as text or binary data. It\'s ideal for serving images or documents to a browser, storing files for distributed access, streaming video and audio, and data backup.',
    tip: 'Blob = Binary Large OBject. It stores anything that doesn\'t fit neatly into rows and columns — photos, videos, PDFs, backups, etc.'
  },
  {
    id: 'aa-15',
    topic: 'azure-architecture',
    subtopic: 'Storage Services',
    difficulty: 'medium',
    question: 'Which Azure Blob Storage tier is optimised for data that is rarely accessed and stored for at least 180 days?',
    options: [
      'Hot tier',
      'Cool tier',
      'Cold tier',
      'Archive tier'
    ],
    correctIndex: 2,
    explanation: 'The Cold tier is optimized for data that is infrequently accessed and stored for a minimum of 90 days. The Archive tier is for data rarely accessed and stored for at least 180 days. Hot tier is for frequently accessed data, and Cool tier is for data accessed infrequently and stored for at least 30 days.',
    tip: 'Think of it like clothes: Hot = everyday wear. Cool = seasonal clothes stored away. Cold = rarely worn formal outfits. Archive = wedding dress in deep storage.'
  },
  {
    id: 'aa-16',
    topic: 'azure-architecture',
    subtopic: 'Storage Services',
    difficulty: 'medium',
    question: 'Which Azure storage redundancy option replicates data three times within a single datacenter in the primary region?',
    options: [
      'Locally Redundant Storage (LRS)',
      'Zone-Redundant Storage (ZRS)',
      'Geo-Redundant Storage (GRS)',
      'Read-Access Geo-Redundant Storage (RA-GRS)'
    ],
    correctIndex: 0,
    explanation: 'Locally Redundant Storage (LRS) replicates your data three times within a single datacenter in the primary region. LRS provides at least 99.999999999% (11 nines) durability. It\'s the lowest-cost redundancy option.',
    tip: 'LRS = 3 copies in ONE building. ZRS = 3 copies in THREE different buildings (zones). GRS = copies in TWO different cities (regions).'
  },
  {
    id: 'aa-17',
    topic: 'azure-architecture',
    subtopic: 'Storage Services',
    difficulty: 'easy',
    question: 'Which tool is a command-line utility designed for copying data to and from Azure Storage?',
    options: [
      'Azure Storage Explorer',
      'AzCopy',
      'Azure File Sync',
      'Azure Data Box'
    ],
    correctIndex: 1,
    explanation: 'AzCopy is a command-line utility that you can use to copy blobs or files to or from a storage account. It\'s optimized for high-performance data transfer and supports both upload and download operations.',
    tip: 'AzCopy is like using the "cp" command in Linux, but for copying data to/from Azure Storage. Fast and efficient.'
  },
  {
    id: 'aa-18',
    topic: 'azure-architecture',
    subtopic: 'Storage Services',
    difficulty: 'medium',
    question: 'Which Azure migration service helps organisations migrate large amounts of data using a physical shipping device?',
    options: [
      'Azure Migrate',
      'AzCopy',
      'Azure Data Box',
      'Azure File Sync'
    ],
    correctIndex: 2,
    explanation: 'Azure Data Box is a physical device that Microsoft ships to you. You load your data onto the device and ship it back to an Azure datacenter. It\'s designed for scenarios where transferring large amounts of data over the network isn\'t practical.',
    tip: 'Azure Data Box is like using a courier service to send a hard drive full of data instead of uploading it over slow internet. Very useful in areas with limited bandwidth.'
  },

  // -- Identity, Access, and Security --
  {
    id: 'aa-19',
    topic: 'azure-architecture',
    subtopic: 'Identity & Security',
    difficulty: 'easy',
    question: 'What is Microsoft Entra ID (formerly Azure Active Directory)?',
    options: [
      'A relational database service',
      'A cloud-based identity and access management service',
      'A virtual machine monitoring tool',
      'A network firewall service'
    ],
    correctIndex: 1,
    explanation: 'Microsoft Entra ID is a cloud-based identity and access management service. It helps employees sign in and access resources including internal resources (apps on your corporate network), external resources (Microsoft 365, Azure portal, and thousands of other SaaS applications).',
    tip: 'Entra ID is like the security guard and receptionist at a corporate building — it checks who you are, verifies your credentials, and decides which doors you can open.'
  },
  {
    id: 'aa-20',
    topic: 'azure-architecture',
    subtopic: 'Identity & Security',
    difficulty: 'medium',
    question: 'What is multifactor authentication (MFA)?',
    options: [
      'Using multiple passwords for the same account',
      'A process requiring two or more verification methods from different categories: something you know, have, or are',
      'Logging into multiple accounts simultaneously',
      'Encrypting data with multiple keys'
    ],
    correctIndex: 1,
    explanation: 'Multifactor authentication (MFA) is a process where a user is prompted for additional forms of identification during sign-in. The factors include: something you know (password), something you have (phone/token), and something you are (biometrics like fingerprint).',
    tip: 'MFA is like how M-Pesa works: you need your phone (something you have) AND your PIN (something you know). Neither alone is enough.'
  },
  {
    id: 'aa-21',
    topic: 'azure-architecture',
    subtopic: 'Identity & Security',
    difficulty: 'medium',
    question: 'What is the Zero Trust security model?',
    options: [
      'A model that trusts all internal network traffic',
      'A model that assumes everything is on an open, untrusted network and verifies each request as if it comes from an uncontrolled network',
      'A model that blocks all external access',
      'A model that only trusts encrypted traffic'
    ],
    correctIndex: 1,
    explanation: 'Zero Trust assumes that everything is on an open and untrusted network — even resources behind the corporate firewall. It operates on the principle of "never trust, always verify," requiring explicit verification for every request.',
    tip: 'Zero Trust is like airport security — even if you\'re a pilot, you still go through the metal detector every single time. No one gets a free pass.'
  },
  {
    id: 'aa-22',
    topic: 'azure-architecture',
    subtopic: 'Identity & Security',
    difficulty: 'hard',
    question: 'What is the purpose of Microsoft Entra Conditional Access?',
    options: [
      'To provide free access to all Azure resources',
      'To automatically deploy virtual machines based on conditions',
      'To enforce access policies based on signals like user identity, location, device, and risk level',
      'To convert on-premises infrastructure to cloud'
    ],
    correctIndex: 2,
    explanation: 'Conditional Access is a tool used by Microsoft Entra ID to bring signals together, make decisions, and enforce organizational policies. It can consider signals like user or group membership, IP location, device platform, application, and real-time risk detection.',
    tip: 'Conditional Access is like a smart security gate that adjusts its rules: "If you\'re on a company laptop in the office, come right in. If you\'re on a personal phone in another country, verify yourself first."'
  },
  {
    id: 'aa-23',
    topic: 'azure-architecture',
    subtopic: 'Identity & Security',
    difficulty: 'medium',
    question: 'What is Azure Role-Based Access Control (RBAC)?',
    options: [
      'A tool for monitoring Azure costs',
      'A system that provides fine-grained access management to Azure resources based on assigned roles',
      'A backup and recovery service',
      'A virtual networking feature'
    ],
    correctIndex: 1,
    explanation: 'Azure RBAC helps you manage who has access to Azure resources, what they can do with those resources, and what areas they have access to. It\'s built on Azure Resource Manager and provides fine-grained access management using roles like Owner, Contributor, and Reader.',
    tip: 'RBAC is like key cards in a hotel — the manager (Owner) can access all rooms, housekeeping (Contributor) can enter to clean, and guests (Reader) can only view the common areas.'
  },
  {
    id: 'aa-24',
    topic: 'azure-architecture',
    subtopic: 'Identity & Security',
    difficulty: 'easy',
    question: 'What is the defense-in-depth model?',
    options: [
      'Using only firewalls to protect resources',
      'A strategy that uses a series of layers of protection, so if one layer fails, others are in place to prevent further exposure',
      'Encrypting all data with a single algorithm',
      'Backing up data to multiple regions'
    ],
    correctIndex: 1,
    explanation: 'Defense in depth uses a series of mechanisms to slow the advance of an attack. Each layer provides protection so that if one layer is breached, a subsequent layer prevents further exposure. Layers include physical security, identity, perimeter, network, compute, application, and data.',
    tip: 'Defense in depth is like the layers of security in a compound — a gate, then a guard, then a locked door, then a safe. An intruder has to get through ALL of them.'
  },
  {
    id: 'aa-25',
    topic: 'azure-architecture',
    subtopic: 'Identity & Security',
    difficulty: 'medium',
    question: 'What is Microsoft Defender for Cloud?',
    options: [
      'An antivirus software for Windows PCs',
      'A cloud-native application protection platform that helps strengthen your security posture and protects workloads across Azure, hybrid, and multi-cloud environments',
      'A firewall service for blocking network traffic',
      'A tool for managing Azure subscriptions'
    ],
    correctIndex: 1,
    explanation: 'Microsoft Defender for Cloud is a cloud-native application protection platform (CNAPP). It provides security posture management and threat protection for workloads running in Azure, on-premises, and other cloud platforms.',
    tip: 'Defender for Cloud is like having a 24/7 security company monitoring all your buildings (cloud resources) — they assess vulnerabilities, alert you to threats, and suggest improvements.'
  },

  // =====================================================
  // TOPIC 3: AZURE MANAGEMENT AND GOVERNANCE (30-35%)
  // =====================================================

  // -- Cost Management --
  {
    id: 'am-1',
    topic: 'azure-management',
    subtopic: 'Cost Management',
    difficulty: 'easy',
    question: 'Which Azure tool helps you estimate the cost of Azure products and services before you deploy them?',
    options: [
      'Azure Cost Management',
      'Azure Pricing Calculator',
      'Azure Advisor',
      'Azure Monitor'
    ],
    correctIndex: 1,
    explanation: 'The Azure Pricing Calculator is a free web tool that lets you estimate the cost of Azure services. You select the services you plan to use, configure them, and the calculator provides an estimated cost.',
    tip: 'The Pricing Calculator is like getting a quotation from a supplier before buying — you know the cost before committing.'
  },
  {
    id: 'am-2',
    topic: 'azure-management',
    subtopic: 'Cost Management',
    difficulty: 'medium',
    question: 'Which factors can affect the cost of running resources in Azure?',
    options: [
      'Only the type of resource',
      'Resource type, usage (pay-as-you-go), region, and data transfer',
      'Only the region where resources are deployed',
      'Only the time of day when resources are used'
    ],
    correctIndex: 1,
    explanation: 'Multiple factors affect Azure costs: the type of resource (VM size, storage type), the amount of usage, the Azure region, data transfer (egress vs ingress), and the pricing model chosen (pay-as-you-go, reserved, spot).',
    tip: 'Just like mobile data plans — cost depends on which plan you pick (resource type), how much data you use (usage), and which network you\'re on (region).'
  },
  {
    id: 'am-3',
    topic: 'azure-management',
    subtopic: 'Cost Management',
    difficulty: 'easy',
    question: 'What is the purpose of resource tags in Azure?',
    options: [
      'To increase the speed of Azure resources',
      'To provide metadata for organising, managing, and tracking costs of Azure resources',
      'To encrypt data stored in Azure',
      'To create virtual networks between resources'
    ],
    correctIndex: 1,
    explanation: 'Tags are metadata elements that you apply to your Azure resources. They consist of name-value pairs. Tags are useful for organising resources, managing costs by department or project, and applying governance policies.',
    tip: 'Tags are like labels on folders in a filing cabinet. You can label by project, department, or cost center to easily find and track resources.'
  },
  {
    id: 'am-4',
    topic: 'azure-management',
    subtopic: 'Cost Management',
    difficulty: 'medium',
    question: 'Which Azure service provides cost analysis, budgets, alerts, and recommendations for managing cloud spending?',
    options: [
      'Azure Pricing Calculator',
      'Azure Cost Management + Billing',
      'Azure Monitor',
      'Azure Advisor'
    ],
    correctIndex: 1,
    explanation: 'Azure Cost Management + Billing helps you understand your Azure bill, manage your account and subscriptions, monitor and control Azure spending, and optimise resource use. It provides cost analysis, budgets, and alerts.',
    tip: 'Cost Management is like your banking app — it shows you what you\'ve spent, helps you set budgets, and alerts you when you\'re spending too much.'
  },

  // -- Governance and Compliance --
  {
    id: 'am-5',
    topic: 'azure-management',
    subtopic: 'Governance & Compliance',
    difficulty: 'medium',
    question: 'What is the purpose of Azure Policy?',
    options: [
      'To manage user passwords',
      'To create and enforce rules and effects over your resources so they stay compliant with corporate standards and SLAs',
      'To monitor resource performance',
      'To deploy resources automatically'
    ],
    correctIndex: 1,
    explanation: 'Azure Policy helps enforce organizational standards and assess compliance at scale. It provides governance and resource consistency through policy definitions that describe conditions to evaluate and actions to take when those conditions aren\'t met.',
    tip: 'Azure Policy is like company rules — for example, "No VM can be created without a cost center tag" or "VMs must be in the South Africa region only." It enforces the rules automatically.'
  },
  {
    id: 'am-6',
    topic: 'azure-management',
    subtopic: 'Governance & Compliance',
    difficulty: 'easy',
    question: 'What is the purpose of resource locks in Azure?',
    options: [
      'To encrypt resources at rest',
      'To prevent resources from being accidentally deleted or modified',
      'To restrict network access to resources',
      'To monitor resource usage'
    ],
    correctIndex: 1,
    explanation: 'Resource locks prevent other users in your organisation from accidentally deleting or modifying critical resources. There are two types: CanNotDelete (users can read and modify but not delete) and ReadOnly (users can read but not modify or delete).',
    tip: 'Resource locks are like putting a padlock on a switch — even administrators can\'t accidentally flip it. The lock must be removed first.'
  },
  {
    id: 'am-7',
    topic: 'azure-management',
    subtopic: 'Governance & Compliance',
    difficulty: 'hard',
    question: 'What is the purpose of Microsoft Purview in Azure?',
    options: [
      'To manage virtual machine configurations',
      'To provide a unified data governance solution that helps manage and govern on-premises, multicloud, and SaaS data',
      'To monitor network performance',
      'To deploy containerised applications'
    ],
    correctIndex: 1,
    explanation: 'Microsoft Purview is a unified data governance solution that helps you manage and govern your on-premises, multicloud, and software-as-a-service (SaaS) data. It provides automated data discovery, sensitive data classification, and end-to-end data lineage.',
    tip: 'Purview is like a librarian who catalogues every book (data), knows where each one is, and can tell you the complete history of how it\'s been used.'
  },

  // -- Resource Deployment --
  {
    id: 'am-8',
    topic: 'azure-management',
    subtopic: 'Resource Deployment',
    difficulty: 'easy',
    question: 'What is the Azure portal?',
    options: [
      'A command-line tool for managing Azure resources',
      'A web-based, unified console for managing Azure resources through a graphical user interface',
      'A mobile app for monitoring Azure',
      'A third-party tool for deploying code'
    ],
    correctIndex: 1,
    explanation: 'The Azure portal is a web-based, unified console that provides an alternative to command-line tools. With the Azure portal, you can manage your Azure subscription using a graphical user interface. You can build, manage, and monitor everything from simple web apps to complex cloud deployments.',
    tip: 'The Azure portal is your visual dashboard — like the home screen of your phone where you can see and manage everything at a glance.'
  },
  {
    id: 'am-9',
    topic: 'azure-management',
    subtopic: 'Resource Deployment',
    difficulty: 'medium',
    question: 'What is Azure Cloud Shell?',
    options: [
      'A virtual machine running in the cloud',
      'An interactive, authenticated, browser-accessible shell for managing Azure resources, supporting both Bash and PowerShell',
      'A desktop application for Windows only',
      'A storage service for shell scripts'
    ],
    correctIndex: 1,
    explanation: 'Azure Cloud Shell is an interactive, authenticated, browser-accessible terminal for managing Azure resources. It provides the flexibility of choosing the shell experience that best suits the way you work — either Bash or PowerShell.',
    tip: 'Cloud Shell is like having a terminal ready to go in your browser — no need to install anything on your computer. Just open it and start managing Azure.'
  },
  {
    id: 'am-10',
    topic: 'azure-management',
    subtopic: 'Resource Deployment',
    difficulty: 'medium',
    question: 'What is the purpose of Azure Arc?',
    options: [
      'To provide a backup solution for Azure VMs',
      'To extend Azure management and governance to resources outside of Azure, including on-premises and other clouds',
      'To create virtual networks across regions',
      'To manage Azure billing and subscriptions'
    ],
    correctIndex: 1,
    explanation: 'Azure Arc extends the Azure management plane to non-Azure resources. With Azure Arc, you can manage servers, Kubernetes clusters, and databases as if they\'re running in Azure, regardless of where they\'re actually hosted.',
    tip: 'Azure Arc is like a universal remote control — it lets you manage ALL your resources (Azure, AWS, on-premises) from a single Azure interface.'
  },
  {
    id: 'am-11',
    topic: 'azure-management',
    subtopic: 'Resource Deployment',
    difficulty: 'hard',
    question: 'What is Infrastructure as Code (IaC) and which Azure service implements it?',
    options: [
      'Writing application code that runs on infrastructure; implemented by Azure Functions',
      'Managing and provisioning infrastructure through code files rather than manual processes; implemented by Azure Resource Manager (ARM) templates',
      'Converting physical infrastructure to virtual; implemented by Azure Migrate',
      'Monitoring infrastructure performance through code; implemented by Azure Monitor'
    ],
    correctIndex: 1,
    explanation: 'Infrastructure as Code (IaC) is the practice of managing and provisioning computing infrastructure through machine-readable definition files rather than manual configuration. ARM templates are JSON files that define the infrastructure and configuration for your Azure project.',
    tip: 'IaC is like having a blueprint for a building — instead of telling builders what to do step by step, you give them a detailed plan and they build it exactly. ARM templates and Bicep are Azure\'s blueprints.'
  },

  // -- Monitoring Tools --
  {
    id: 'am-12',
    topic: 'azure-management',
    subtopic: 'Monitoring Tools',
    difficulty: 'easy',
    question: 'What is Azure Advisor?',
    options: [
      'A monitoring tool for tracking resource performance',
      'A personalised cloud consultant that provides recommendations for optimising Azure deployments across reliability, security, performance, cost, and operational excellence',
      'A support service for submitting Azure help tickets',
      'A tool for deploying Azure resources'
    ],
    correctIndex: 1,
    explanation: 'Azure Advisor is a personalised cloud consultant that helps you follow best practices to optimise your Azure deployments. It analyses your resource configuration and usage telemetry and then provides recommendations for reliability, security, performance, cost, and operational excellence.',
    tip: 'Azure Advisor is like a personal financial advisor for your cloud — it looks at how you\'re spending and says "Hey, you could save money by resizing this VM" or "This resource isn\'t following security best practices."'
  },
  {
    id: 'am-13',
    topic: 'azure-management',
    subtopic: 'Monitoring Tools',
    difficulty: 'medium',
    question: 'What is Azure Service Health?',
    options: [
      'A tool for managing Azure subscriptions',
      'A suite of services that keep you informed about the status of Azure services, planned maintenance, and health advisories that affect your resources',
      'A performance monitoring tool for web applications',
      'A tool for managing virtual machine health checks'
    ],
    correctIndex: 1,
    explanation: 'Azure Service Health is a combination of three services: Azure Status (global overview), Service Health (personalised view of the Azure services and regions you\'re using), and Resource Health (health of individual cloud resources).',
    tip: 'Azure Service Health is like a personalised news feed for your Azure resources — it tells you about outages, maintenance, and health issues that specifically affect YOU.'
  },
  {
    id: 'am-14',
    topic: 'azure-management',
    subtopic: 'Monitoring Tools',
    difficulty: 'medium',
    question: 'Which Azure service provides a comprehensive solution for collecting, analysing, and acting on telemetry from cloud and on-premises environments?',
    options: [
      'Azure Advisor',
      'Azure Service Health',
      'Azure Monitor',
      'Azure Policy'
    ],
    correctIndex: 2,
    explanation: 'Azure Monitor is a comprehensive monitoring solution for collecting, analysing, and responding to telemetry from your cloud and on-premises environments. It includes features like Log Analytics for querying log data, Azure Monitor Alerts for notifications, and Application Insights for application performance monitoring.',
    tip: 'Azure Monitor is like a CCTV system for your cloud — it watches everything, records activity, and alerts you when something needs attention.'
  },
  {
    id: 'am-15',
    topic: 'azure-management',
    subtopic: 'Monitoring Tools',
    difficulty: 'hard',
    question: 'What is the relationship between Azure Monitor, Log Analytics, and Application Insights?',
    options: [
      'They are three completely separate and unrelated services',
      'Log Analytics and Application Insights are features within Azure Monitor that provide log querying and application performance monitoring respectively',
      'Azure Monitor is a feature within Application Insights',
      'Log Analytics replaced Azure Monitor in recent updates'
    ],
    correctIndex: 1,
    explanation: 'Azure Monitor is the umbrella service. Log Analytics is a tool within Azure Monitor used to query and analyse log data. Application Insights is a feature of Azure Monitor that provides application performance management (APM) for live web applications.',
    tip: 'Azure Monitor is the control room. Log Analytics is the search tool that finds specific footage. Application Insights is the camera focused specifically on your web applications.'
  }
];

/**
 * Get questions filtered by topic
 */
export function getQuestionsByTopic(topicId) {
  return QUESTIONS.filter(q => q.topic === topicId);
}

/**
 * Get questions filtered by topic and shuffled
 */
export function getShuffledQuestions(topicId, count) {
  const topicQuestions = getQuestionsByTopic(topicId);
  const shuffled = [...topicQuestions].sort(() => Math.random() - 0.5);
  return count ? shuffled.slice(0, count) : shuffled;
}

/**
 * Get all questions shuffled (for mixed quiz)
 */
export function getAllShuffledQuestions(count) {
  const shuffled = [...QUESTIONS].sort(() => Math.random() - 0.5);
  return count ? shuffled.slice(0, count) : shuffled;
}

/**
 * Get topic info by ID
 */
export function getTopicById(topicId) {
  return TOPICS.find(t => t.id === topicId);
}
