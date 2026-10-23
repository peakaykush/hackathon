/**
 * AZ-900 High-Yield Exam Study Guide & Cheat Sheet
 * Structured according to the official Microsoft AZ-900 exam objectives.
 */

export const STUDY_SECTIONS = [
  {
    id: 'cloud-concepts',
    title: 'Cloud Concepts (25–30%)',
    icon: 'CC',
    description: 'Cloud computing models, benefits, service types, and shared responsibility.',
    topics: [
      {
        id: 'benefits',
        name: 'Cloud Computing Benefits',
        badge: 'High Yield',
        summary: 'Core characteristics and terminology examined on AZ-900.',
        points: [
          { term: 'High Availability (HA)', def: 'Ensuring maximum uptime and continuous service availability with minimal downtime (measured in 9s, e.g., 99.99%).' },
          { term: 'Scalability', def: 'Ability to allocate more resources (Scale Up = more CPU/RAM; Scale Out = adding more VM instances).' },
          { term: 'Elasticity', def: 'Dynamic auto-scaling — automatically expanding during traffic spikes and shrinking when demand falls so you don’t pay for idle capacity.' },
          { term: 'Agility', def: 'Speed of deploying, testing, and modifying cloud resources in minutes instead of weeks.' },
          { term: 'Disaster Recovery (DR)', def: 'Keeping data and services safe by replicating to geographically separated datacenters.' },
          { term: 'CapEx vs. OpEx', def: 'Capital Expenditure (CapEx) is upfront spending on physical hardware and facilities. Operational Expenditure (OpEx) is recurring spending on services and consumption (pay-as-you-go, tax-deductible in the same year).' },
        ],
        examTip: 'Exam Trap: Auto-scaling when load spikes and de-provisioning when load drops is "Elasticity". Adding more RAM to a single existing VM is "Vertical Scaling" (Scaling Up).'
      },
      {
        id: 'cloud-models',
        name: 'Cloud Deployment Models',
        badge: 'Core Concept',
        summary: 'Public, Private, Hybrid, and Multi-Cloud environments.',
        points: [
          { term: 'Public Cloud', def: 'Owned and operated by third-party cloud providers (e.g. Microsoft Azure). Hardware is shared across multiple tenants over the public internet.' },
          { term: 'Private Cloud', def: 'Used exclusively by a single enterprise. Can be hosted in an on-premises datacenter or by a third-party host. Organization is 100% responsible for hardware maintenance and capital costs.' },
          { term: 'Hybrid Cloud', def: 'Interconnects public and private clouds (e.g., legacy on-prem database connected to Azure web apps). Provides maximum flexibility.' },
          { term: 'Multi-Cloud', def: 'Using multiple public cloud providers (e.g., Azure + AWS) to avoid vendor lock-in or satisfy specific requirements.' },
        ],
        examTip: 'Hybrid cloud is the most popular choice for regulated institutions (like banks) migrating legacy on-prem systems to the public cloud.'
      },
      {
        id: 'service-types',
        name: 'Cloud Service Types & Shared Responsibility',
        badge: 'Must Know',
        summary: 'IaaS, PaaS, SaaS breakdown and who is responsible for what.',
        points: [
          { term: 'IaaS (Infrastructure as a Service)', def: 'Renting raw compute, storage, and networking (e.g. Azure Virtual Machines). Customer configures OS, software, runtime, and patches.' },
          { term: 'PaaS (Platform as a Service)', def: 'Managed environment for building and hosting applications (e.g. Azure App Service, Azure SQL). Provider manages OS and hardware; customer only manages code and data.' },
          { term: 'SaaS (Software as a Service)', def: 'End-user ready software hosted centrally (e.g. Microsoft 365, OneDrive). Customer only manages user access and data.' },
        ],
        comparisonTable: [
          { item: 'Data & Access', iaas: 'Customer', paas: 'Customer', saas: 'Customer' },
          { item: 'Applications', iaas: 'Customer', paas: 'Customer', saas: 'Microsoft' },
          { item: 'Runtime & OS', iaas: 'Customer', paas: 'Microsoft', saas: 'Microsoft' },
          { item: 'Virtualization & Hardware', iaas: 'Microsoft', paas: 'Microsoft', saas: 'Microsoft' },
          { item: 'Physical Datacenter', iaas: 'Microsoft', paas: 'Microsoft', saas: 'Microsoft' },
        ],
        examTip: 'Regardless of service type (IaaS, PaaS, SaaS), the Customer ALWAYS owns responsibility for their Data, Identities, and Devices!'
      }
    ]
  },
  {
    id: 'azure-architecture',
    title: 'Azure Architecture & Core Services (35–40%)',
    icon: 'AS',
    description: 'Physical infrastructure, compute, networking, storage, identity, and security.',
    topics: [
      {
        id: 'infrastructure-hierarchy',
        name: 'Azure Physical & Management Hierarchy',
        badge: 'High Yield',
        summary: 'From Datacenters up to Management Groups.',
        points: [
          { term: 'Datacenter', def: 'Physical facility housing servers, power, cooling, and networking.' },
          { term: 'Availability Zone (AZ)', def: 'Physically separate datacenters within an Azure region. Each AZ has independent power, cooling, and networking (minimum 3 AZs in typical regions).' },
          { term: 'Azure Region', def: 'A geographical area containing one or more datacenters connected via a low-latency network.' },
          { term: 'Region Pairs', def: 'Each region is paired with another region in the same geography (at least 300 miles away) for disaster recovery and sequential updates.' },
          { term: 'Resource Group', def: 'A logical container for resources that share the same lifecycle. Resources can only exist in ONE resource group at a time.' },
          { term: 'Subscriptions', def: 'A billing and access boundary for Azure resources.' },
          { term: 'Management Groups', def: 'Containers above subscriptions to manage access, policy, and compliance across multiple subscriptions.' },
        ],
        examTip: 'Management Hierarchy: Management Groups → Subscriptions → Resource Groups → Resources. Policies and RBAC inherit downwards!'
      },
      {
        id: 'compute-services',
        name: 'Azure Compute Services Comparison',
        badge: 'Core Services',
        summary: 'When to choose which compute resource.',
        points: [
          { term: 'Azure Virtual Machines (VM)', def: 'IaaS compute offering total OS control. Suitable for custom software and legacy app migrations.' },
          { term: 'VM Scale Sets (VMSS)', def: 'Identical, auto-scaling pools of VMs for high-availability workloads.' },
          { term: 'Azure App Service', def: 'PaaS for building, deploying, and scaling enterprise web applications, REST APIs, and mobile backends without managing VMs.' },
          { term: 'Azure Container Instances (ACI)', def: 'Fastest and simplest way to run a single container without managing orchestration or servers (serverless container).' },
          { term: 'Azure Kubernetes Service (AKS)', def: 'Enterprise container orchestration for complex multi-container microservice deployments.' },
          { term: 'Azure Functions', def: 'Event-driven, serverless compute service where you pay only when code executes.' },
          { term: 'Azure Virtual Desktop (AVD)', def: 'Desktop and app virtualization running in the cloud (multi-session Windows 10/11).' },
        ],
        examTip: 'Need serverless event execution without orchestrator? Choose Azure Functions. Need to run Docker container without cluster setup? Choose Azure Container Instances (ACI).'
      },
      {
        id: 'storage-services',
        name: 'Azure Storage Services & Access Tiers',
        badge: 'Exam Favorite',
        summary: 'Blobs, Files, Queues, Disks, and lifecycle management.',
        points: [
          { term: 'Blob Storage', def: 'Massively scalable object store for unstructured data (images, videos, backups, logs).' },
          { term: 'Azure Files', def: 'Fully managed cloud file shares accessible via SMB and NFS protocols (mounts directly to Windows, Linux, macOS).' },
          { term: 'Azure Disks', def: 'Block-level storage volumes for Azure VMs (OS and data drives).' },
          { term: 'Azure Queues', def: 'Asynchronous message store for decoupling application components.' },
        ],
        comparisonTable: [
          { item: 'Hot Tier', iaas: 'Highest storage cost', paas: 'Lowest access cost', saas: 'Active, frequent access' },
          { item: 'Cool Tier', iaas: 'Lower storage cost', paas: 'Higher access cost', saas: 'Stored for at least 30 days' },
          { item: 'Cold Tier', iaas: 'Even lower storage', paas: 'Higher access cost', saas: 'Stored for at least 90 days' },
          { item: 'Archive Tier', iaas: 'Lowest storage cost', paas: 'Highest access cost', saas: 'Stored for at least 180 days (hours to rehydrate)' },
        ],
        examTip: 'Archive tier is offline! Reading data requires "rehydrating" it first, which can take several hours.'
      },
      {
        id: 'networking-services',
        name: 'Networking & Connectivity',
        badge: 'Core Services',
        summary: 'VNets, Peering, Bastion, VPN Gateway, and ExpressRoute.',
        points: [
          { term: 'Virtual Network (VNet)', def: 'Enables Azure resources to communicate securely with each other, the internet, and on-premises networks.' },
          { term: 'Subnets', def: 'Segments of an IP address space within a VNet to group resources.' },
          { term: 'VNet Peering', def: 'Seamlessly connects two or more VNets together using Azure’s private backbone network.' },
          { term: 'Azure Bastion', def: 'Fully managed PaaS service providing secure RDP/SSH access to VMs directly via browser over SSL (no public IP required on VM).' },
          { term: 'VPN Gateway', def: 'Sends encrypted traffic across the public internet between an Azure VNet and on-premises location (Site-to-Site) or individual devices (Point-to-Site).' },
          { term: 'ExpressRoute', def: 'Dedicated, private fiber connection directly between on-premises infrastructure and Microsoft cloud that DOES NOT travel over the public internet.' },
          { term: 'Network Security Group (NSG)', def: 'Filter network traffic to and from Azure resources in an Azure VNet using allow/deny rules (5-tuple: source, source port, destination, destination port, protocol).' },
        ],
        examTip: 'Exam Question: If an organization requires the fastest connection with highest reliability that DOES NOT touch the public internet, the answer is ExpressRoute!'
      }
    ]
  },
  {
    id: 'azure-management',
    title: 'Azure Management & Governance (30–35%)',
    icon: 'MG',
    description: 'Cost management, governance, security compliance, deployment tools, and monitoring.',
    topics: [
      {
        id: 'identity-security',
        name: 'Identity & Access (Entra ID, RBAC, Zero Trust)',
        badge: 'Must Know',
        summary: 'Authentication vs Authorization and Access Controls.',
        points: [
          { term: 'Microsoft Entra ID', def: 'Cloud-based identity and access management service (formerly Azure Active Directory). Handles authentication (AuthN) and single sign-on (SSO).' },
          { term: 'Authentication vs. Authorization', def: 'Authentication (AuthN) verifies WHO you are (username, password, MFA). Authorization (AuthZ) determines WHAT permissions you have.' },
          { term: 'Conditional Access', def: 'Tool used by Microsoft Entra ID to allow or deny access based on identity signals (user location, device health, risk score).' },
          { term: 'Role-Based Access Control (RBAC)', def: 'Fine-grained access management based on roles (e.g. Owner, Contributor, Reader). Gives users only the permissions they need (Principle of Least Privilege).' },
          { term: 'Zero Trust Model', def: 'Guiding principle: "Never trust, always verify." Every access request is fully authenticated, authorized, and encrypted.' },
          { term: 'Azure Key Vault', def: 'Centralized cloud service for securely storing API keys, secrets, certificates, and cryptographic keys.' },
        ],
        examTip: 'RBAC controls permissions (Authorization), whereas Microsoft Entra ID verifies identity (Authentication).'
      },
      {
        id: 'governance-compliance',
        name: 'Azure Governance & Resource Protection',
        badge: 'High Yield',
        summary: 'Azure Policy, Resource Locks, Blueprints, and Purview.',
        points: [
          { term: 'Azure Policy', def: 'Enforces standards and evaluates compliance across your organization (e.g. enforce allowed VM sizes, require specific tags, or restrict deployments to allowed regions).' },
          { term: 'Resource Locks', def: 'Prevent accidental deletion or modification of critical resources: "CanNotDelete" (can read and modify, but cannot delete) and "ReadOnly" (can read, but cannot modify or delete).' },
          { term: 'Azure Tags', def: 'Metadata key-value pairs assigned to resources to logically organize them for billing and management (e.g. Environment=Production, CostCenter=Marketing).' },
          { term: 'Microsoft Purview', def: 'Comprehensive data governance and data compliance management solution.' },
        ],
        examTip: 'To prevent an administrator from accidentally deleting an Azure SQL database without changing their permissions, apply a "CanNotDelete" Resource Lock!'
      },
      {
        id: 'cost-management',
        name: 'Cost Planning & Optimization',
        badge: 'Exam Favorite',
        summary: 'Pricing Calculator, TCO, Cost Alerts, and Reservations.',
        points: [
          { term: 'Azure Pricing Calculator', def: 'Estimates costs for provisioned Azure products and services BEFORE creating them.' },
          { term: 'Total Cost of Ownership (TCO) Calculator', def: 'Compares the cost of running on-premises infrastructure against running the same workload in Azure over time.' },
          { term: 'Microsoft Cost Management', def: 'Tracks cloud spend, monitors resource usage, creates budgets, and triggers cost threshold alerts.' },
          { term: 'Azure Reservations', def: 'Pre-paying for 1-year or 3-year commitments on VMs or databases to get up to 72% discounts compared to pay-as-you-go rates.' },
        ],
        examTip: 'To compare future costs of moving an on-premises datacenter to Azure, use the TCO Calculator. To estimate monthly cost of new Azure services, use the Pricing Calculator.'
      },
      {
        id: 'monitoring-tools',
        name: 'Monitoring & Health Services',
        badge: 'Core Services',
        summary: 'Azure Monitor, Log Analytics, Application Insights, and Advisor.',
        points: [
          { term: 'Azure Monitor', def: 'Comprehensive solution for collecting, analyzing, and acting on telemetry from cloud and on-premises environments.' },
          { term: 'Log Analytics', def: 'Tool in the Azure portal used to edit and run log queries against data collected by Azure Monitor (uses Kusto Query Language - KQL).' },
          { term: 'Application Insights', def: 'Feature of Azure Monitor providing Application Performance Monitoring (APM) for live web applications (detects anomalies and crashes).' },
          { term: 'Azure Service Health', def: 'Personalized dashboard informing you about Azure service incidents, planned maintenance, and health advisories affecting YOUR specific subscriptions.' },
          { term: 'Azure Advisor', def: 'Personalized cloud consultant that analyzes resource configurations and recommends best practices in 5 pillars: High Availability, Security, Performance, Cost, and Operational Excellence.' },
        ],
        examTip: 'Azure Advisor provides recommendations across: High Availability, Security, Performance, Cost, and Operational Excellence.'
      }
    ]
  }
];
