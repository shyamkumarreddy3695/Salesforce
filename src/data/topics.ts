import type { Topic } from '../types';

export const topics: Topic[] = [
  // SALESFORCE ADMINISTRATION
  {
    id: 'user-management',
    title: 'User Management & Security',
    section: 'admin',
    content: `
      <p>User management forms the cornerstone of Salesforce administration, encompassing the creation, maintenance, and governance of user accounts, security models, and access controls. This involves a sophisticated understanding of Salesforce's multi-layered security architecture.</p>
      
      <h3>Security Model Architecture</h3>
      <p>Salesforce employs a comprehensive security model with multiple layers:</p>
      <ul>
        <li><strong>Organization Level:</strong> IP restrictions, login hours, session settings</li>
        <li><strong>Object Level:</strong> CRUD permissions via profiles and permission sets</li>
        <li><strong>Field Level:</strong> Field-level security (FLS) controlling field visibility and editability</li>
        <li><strong>Record Level:</strong> Role hierarchy, sharing rules, manual sharing, and teams</li>
      </ul>
      
      <h3>Profile vs Permission Set Strategy</h3>
      <p>Modern Salesforce implementations follow the "minimal profile, additive permission sets" approach. Profiles define the baseline permissions, while permission sets provide additional capabilities. This strategy offers:</p>
      <ul>
        <li>Reduced profile proliferation</li>
        <li>Easier maintenance and governance</li>
        <li>More granular permission management</li>
        <li>Better compliance and audit trails</li>
      </ul>
      
      <h3>Enterprise Security Considerations</h3>
      <p>In large organizations, security architecture must address:</p>
      <ul>
        <li>Multi-org security strategies</li>
        <li>Single Sign-On (SSO) implementation</li>
        <li>Identity provider integration</li>
        <li>Compliance requirements (SOX, GDPR, HIPAA)</li>
        <li>Data classification and handling</li>
      </ul>
    `,
    keyPoints: [
      'Implement least privilege principle with minimal profiles and additive permission sets',
      'Use role hierarchy for data visibility, not functional access control',
      'Regular security reviews and access certifications are essential',
      'Document security decisions for compliance and audit purposes',
      'Consider territory management for complex geographic data access patterns'
    ],
    examples: [
      {
        title: 'Financial Services Security Model',
        description: 'Complex security implementation for a global investment bank',
        code: `// Permission Set for Trade Settlement Access
Permission Set: Trade_Settlement_Access
- Object Permissions:
  - Trade__c: Read, Create, Edit
  - Settlement__c: Read, Create, Edit, Delete
  - Counterparty__c: Read
- Field Permissions:
  - Trade__c.Settlement_Amount__c: Read, Edit
  - Trade__c.Regulatory_Status__c: Read
- System Permissions:
  - API Enabled
  - View Setup and Configuration

// Role Hierarchy Design
CEO
├── Regional_VP_Americas
│   ├── Trading_Desk_Manager_NY
│   │   ├── Senior_Trader_Equities
│   │   └── Junior_Trader_Equities
│   └── Settlement_Manager_NY
└── Regional_VP_EMEA
    ├── Trading_Desk_Manager_London
    └── Settlement_Manager_London`,
        language: 'yaml',
        explanation: 'This example shows how a financial services company structures permissions for trading operations. The permission set provides specific access to trading objects while the role hierarchy ensures proper data visibility across geographic regions. Notice how settlement managers have broader access than traders, reflecting real-world business requirements.'
      },
      {
        title: 'Healthcare Data Access Control',
        description: 'HIPAA-compliant patient data access implementation',
        code: `// Custom Permission for PHI Access
public class PHIAccessController {
    @AuraEnabled
    public static Boolean hasPatientAccess(Id patientId, Id userId) {
        // Check if user has PHI access permission
        if (!FeatureManagement.checkPermission('PHI_Access')) {
            return false;
        }
        
        // Verify care team relationship
        List<Care_Team_Member__c> careTeam = [
            SELECT Id FROM Care_Team_Member__c 
            WHERE Patient__c = :patientId 
            AND User__c = :userId 
            AND Status__c = 'Active'
            AND Access_End_Date__c >= TODAY
        ];
        
        return !careTeam.isEmpty();
    }
    
    // Audit trail for PHI access
    @future
    public static void logPHIAccess(Id patientId, Id userId, String accessType) {
        PHI_Access_Log__c log = new PHI_Access_Log__c(
            Patient__c = patientId,
            Accessed_By__c = userId,
            Access_Type__c = accessType,
            Access_Timestamp__c = System.now(),
            IP_Address__c = Auth.SessionManagement.getCurrentSession().get('SourceIp')
        );
        insert log;
    }
}`,
        language: 'apex',
        explanation: 'Healthcare organizations require strict PHI (Protected Health Information) access controls. This implementation combines custom permissions with relationship-based access control and comprehensive audit logging. The system ensures only authorized care team members can access patient data and maintains detailed access logs for compliance.'
      }
    ],
    limitations: [
      'Maximum of 1,000 permission sets per user',
      'Profile changes require user logout/login to take effect',
      'Complex permission combinations can impact performance',
      'Territory management has specific licensing requirements',
      'Some system permissions cannot be granted via permission sets'
    ],
    architecturalConsiderations: [
      'Design permission strategy before implementation to avoid technical debt',
      'Consider future scalability when designing role hierarchies',
      'Plan for multi-org scenarios in enterprise environments',
      'Implement automated permission reviews and compliance reporting',
      'Document security architecture decisions for audit and maintenance'
    ]
  },
  {
    id: 'data-quality',
    title: 'Data Quality & Management',
    section: 'admin',
    content: `
      <p>Data quality management in Salesforce encompasses the strategies, tools, and processes used to ensure data accuracy, completeness, consistency, and reliability across the platform. Poor data quality can cost organizations millions in lost productivity and incorrect business decisions.</p>
      
      <h3>Data Quality Framework</h3>
      <p>A comprehensive data quality framework includes:</p>
      <ul>
        <li><strong>Data Profiling:</strong> Understanding current data state and quality issues</li>
        <li><strong>Data Cleansing:</strong> Correcting identified data quality problems</li>
        <li><strong>Data Validation:</strong> Preventing future data quality issues</li>
        <li><strong>Data Monitoring:</strong> Ongoing assessment of data quality metrics</li>
        <li><strong>Data Governance:</strong> Policies and procedures for data management</li>
      </ul>
      
      <h3>Advanced Validation Strategies</h3>
      <p>Beyond basic validation rules, enterprise implementations require:</p>
      <ul>
        <li>Cross-object validation using custom Apex triggers</li>
        <li>External system validation through API callouts</li>
        <li>Conditional validation based on user profiles or record types</li>
        <li>Batch validation for data migration and cleanup</li>
      </ul>
      
      <h3>Data Integration Quality</h3>
      <p>When integrating with external systems, data quality considerations include:</p>
      <ul>
        <li>Data transformation and mapping accuracy</li>
        <li>Handling of null values and default data</li>
        <li>Duplicate detection across system boundaries</li>
        <li>Data synchronization and conflict resolution</li>
      </ul>
    `,
    keyPoints: [
      'Implement validation rules at multiple levels: field, record, and cross-object',
      'Use duplicate management to maintain clean customer and prospect data',
      'Establish data governance policies with clear ownership and accountability',
      'Regular data quality audits and cleanup processes are essential',
      'Consider data archiving strategies for long-term data management'
    ],
    examples: [
      {
        title: 'Enterprise Account Validation System',
        description: 'Multi-layered validation for global account management',
        code: `// Advanced Account Validation Trigger
trigger AccountValidationTrigger on Account (before insert, before update) {
    AccountValidationHandler.handleValidation(Trigger.new, Trigger.oldMap);
}

public class AccountValidationHandler {
    public static void handleValidation(List<Account> newAccounts, Map<Id, Account> oldMap) {
        validateTaxIds(newAccounts);
        validateDunsNumbers(newAccounts);
        validateGeographicData(newAccounts);
        validateParentChildRelationships(newAccounts, oldMap);
    }
    
    private static void validateTaxIds(List<Account> accounts) {
        Set<String> taxIds = new Set<String>();
        Map<String, String> countryTaxPatterns = new Map<String, String>{
            'US' => '^\\d{2}-\\d{7}$',  // EIN format
            'GB' => '^\\d{9}$',         // UK Company Number
            'DE' => '^DE\\d{9}$'        // German Tax Number
        };
        
        for (Account acc : accounts) {
            if (String.isNotBlank(acc.Tax_ID__c) && String.isNotBlank(acc.BillingCountry)) {
                String pattern = countryTaxPatterns.get(acc.BillingCountry);
                if (pattern != null && !Pattern.matches(pattern, acc.Tax_ID__c)) {
                    acc.addError('Tax ID format invalid for country: ' + acc.BillingCountry);
                }
                taxIds.add(acc.Tax_ID__c);
            }
        }
        
        // Check for duplicate Tax IDs
        List<Account> existingAccounts = [
            SELECT Id, Tax_ID__c FROM Account 
            WHERE Tax_ID__c IN :taxIds AND Id NOT IN :accounts
        ];
        
        Map<String, Id> existingTaxIds = new Map<String, Id>();
        for (Account existing : existingAccounts) {
            existingTaxIds.put(existing.Tax_ID__c, existing.Id);
        }
        
        for (Account acc : accounts) {
            if (existingTaxIds.containsKey(acc.Tax_ID__c)) {
                acc.addError('Account with this Tax ID already exists: ' + existingTaxIds.get(acc.Tax_ID__c));
            }
        }
    }
}`,
        language: 'apex',
        explanation: 'This enterprise-grade validation system demonstrates multi-country tax ID validation with duplicate checking. It uses regular expressions for format validation and cross-references existing records to prevent duplicates. The modular design allows for easy extension to additional countries and validation rules.'
      },
      {
        title: 'Data Quality Dashboard Implementation',
        description: 'Real-time data quality monitoring and reporting system',
        code: `// Data Quality Metrics Batch Job
global class DataQualityMetricsBatch implements Database.Batchable<sObject>, Database.Stateful {
    global Integer totalRecords = 0;
    global Integer qualityIssues = 0;
    global Map<String, Integer> issueTypes = new Map<String, Integer>();
    
    global Database.QueryLocator start(Database.BatchableContext bc) {
        return Database.getQueryLocator([
            SELECT Id, Name, Phone, Email, BillingStreet, BillingCity, 
                   BillingState, BillingCountry, Industry, AnnualRevenue
            FROM Account 
            WHERE CreatedDate = LAST_N_DAYS:30
        ]);
    }
    
    global void execute(Database.BatchableContext bc, List<Account> accounts) {
        for (Account acc : accounts) {
            totalRecords++;
            List<String> issues = validateAccountQuality(acc);
            
            if (!issues.isEmpty()) {
                qualityIssues++;
                for (String issue : issues) {
                    Integer count = issueTypes.get(issue);
                    issueTypes.put(issue, count == null ? 1 : count + 1);
                }
                
                // Create data quality issue record
                Data_Quality_Issue__c dqi = new Data_Quality_Issue__c(
                    Record_Id__c = acc.Id,
                    Object_Type__c = 'Account',
                    Issue_Types__c = String.join(issues, ';'),
                    Severity__c = calculateSeverity(issues),
                    Detected_Date__c = System.now()
                );
                insert dqi;
            }
        }
    }
    
    private List<String> validateAccountQuality(Account acc) {
        List<String> issues = new List<String>();
        
        // Missing critical information
        if (String.isBlank(acc.Phone)) issues.add('Missing Phone');
        if (String.isBlank(acc.Email)) issues.add('Missing Email');
        if (String.isBlank(acc.Industry)) issues.add('Missing Industry');
        
        // Address completeness
        if (String.isBlank(acc.BillingStreet) || 
            String.isBlank(acc.BillingCity) || 
            String.isBlank(acc.BillingState)) {
            issues.add('Incomplete Address');
        }
        
        // Data format issues
        if (String.isNotBlank(acc.Email) && !acc.Email.contains('@')) {
            issues.add('Invalid Email Format');
        }
        
        if (String.isNotBlank(acc.Phone) && acc.Phone.length() < 10) {
            issues.add('Invalid Phone Format');
        }
        
        return issues;
    }
    
    global void finish(Database.BatchableContext bc) {
        // Create summary report
        Data_Quality_Report__c report = new Data_Quality_Report__c(
            Report_Date__c = System.today(),
            Total_Records_Analyzed__c = totalRecords,
            Records_With_Issues__c = qualityIssues,
            Quality_Score__c = ((totalRecords - qualityIssues) * 100.0) / totalRecords,
            Issue_Breakdown__c = JSON.serialize(issueTypes)
        );
        insert report;
        
        // Send notification to data stewards
        notifyDataStewards(report);
    }
}`,
        language: 'apex',
        explanation: 'This batch job provides automated data quality assessment for newly created accounts. It identifies common data quality issues, calculates quality scores, and creates detailed reports for data stewards. The system can be extended to cover additional objects and quality criteria, providing ongoing visibility into data health.'
      }
    ],
    limitations: [
      'Validation rules cannot perform DML operations or callouts',
      'Maximum of 500 active validation rules per object',
      'Duplicate rules have limitations with certain field types',
      'Data Loader has a 5,000 record limit for duplicate detection',
      'Some data quality tools require additional licenses'
    ],
    architecturalConsiderations: [
      'Balance data quality enforcement with user productivity',
      'Design validation rules that work across all entry points (UI, API, integration)',
      'Consider performance impact of complex validation logic',
      'Plan for data migration and cleanup in validation rule design',
      'Implement monitoring and alerting for data quality metrics'
    ]
  },
  {
    id: 'workflow-automation',
    title: 'Workflow Automation & Process Builder',
    section: 'admin',
    content: `
      <p>Modern Salesforce automation centers around Flow Builder, which has replaced Workflow Rules and Process Builder as the primary automation tool. Flow provides a visual, declarative way to build complex business processes while maintaining the power and flexibility needed for enterprise requirements.</p>
      
      <h3>Flow Architecture & Types</h3>
      <p>Salesforce Flow encompasses several types of automation:</p>
      <ul>
        <li><strong>Screen Flows:</strong> User-guided processes with interactive screens</li>
        <li><strong>Auto-launched Flows:</strong> Background processes triggered by record changes</li>
        <li><strong>Schedule-triggered Flows:</strong> Time-based automation running on schedules</li>
        <li><strong>Platform Event Flows:</strong> Real-time event-driven processes</li>
        <li><strong>Record-triggered Flows:</strong> Replacement for Process Builder with better performance</li>
      </ul>
      
      <h3>Enterprise Flow Design Patterns</h3>
      <p>Large-scale implementations require sophisticated flow design:</p>
      <ul>
        <li><strong>Modular Design:</strong> Using subflows for reusable logic components</li>
        <li><strong>Error Handling:</strong> Comprehensive fault paths and error logging</li>
        <li><strong>Bulkification:</strong> Designing flows to handle large data volumes efficiently</li>
        <li><strong>Testing Strategy:</strong> Systematic testing of all flow paths and scenarios</li>
      </ul>
      
      <h3>Integration with External Systems</h3>
      <p>Flows can integrate with external systems through:</p>
      <ul>
        <li>HTTP callouts to REST APIs</li>
        <li>Platform Events for real-time integration</li>
        <li>Custom Apex actions for complex logic</li>
        <li>External Services for SOAP integration</li>
      </ul>
    `,
    keyPoints: [
      'Use Flow Builder for all new automation; migrate from Process Builder and Workflow Rules',
      'Design flows with bulkification in mind to handle large data volumes',
      'Implement comprehensive error handling and logging in production flows',
      'Use subflows to create reusable components and reduce maintenance overhead',
      'Test flows thoroughly with various data scenarios and edge cases'
    ],
    examples: [
      {
        title: 'Enterprise Opportunity Management Flow',
        description: 'Complex opportunity approval and notification system',
        code: `// Flow: Opportunity_Approval_Process
// Trigger: Record-triggered flow on Opportunity (Before Save)

Start: Record-triggered Flow
├── Decision: Check Opportunity Amount
│   ├── Amount > $1,000,000
│   │   ├── Assignment: Set Approval Required = True
│   │   ├── Decision: Check Sales Rep Experience
│   │   │   ├── Years < 2: Route to Senior Manager
│   │   │   └── Years >= 2: Route to Regional Manager
│   │   └── Subflow: Create_Approval_Request
│   │       ├── Input: Opportunity ID
│   │       ├── Input: Approver ID
│   │       ├── Input: Approval Reason
│   │       └── Output: Approval Request ID
│   └── Amount <= $1,000,000
│       └── Assignment: Set Auto-Approved = True
├── Decision: Check Discount Percentage
│   ├── Discount > 20%
│   │   ├── Subflow: Validate_Discount_Authority
│   │   └── Action: Send Email to Finance Team
│   └── Discount <= 20%: Continue
└── Decision: Check Close Date
    ├── Close Date < 30 days
    │   ├── Action: Create Task for Legal Review
    │   └── Platform Event: Urgent_Deal_Alert
    └── Close Date >= 30 days: End

// Subflow: Create_Approval_Request
Input Variables:
- opportunityId (Text)
- approverId (Text)  
- approvalReason (Text)

Flow Steps:
1. Get Records: Fetch Opportunity Details
2. Create Records: Approval Request
   - Opportunity__c = {opportunityId}
   - Approver__c = {approverId}
   - Reason__c = {approvalReason}
   - Status__c = "Pending"
   - Requested_Date__c = {$Flow.CurrentDateTime}
3. Send Email: Approval Notification
   - To: {approverId}
   - Template: Opportunity_Approval_Required
   - Record ID: {opportunityId}
4. Assignment: Set Output Variable
   - approvalRequestId = {CreatedApprovalRequest.Id}`,
        language: 'yaml',
        explanation: 'This enterprise flow demonstrates complex business logic with multiple decision points, subflow usage, and integration with approval processes. The modular design using subflows allows for reusability and easier maintenance. The flow handles various scenarios including high-value deals, discount approvals, and urgent deal alerts.'
      },
      {
        title: 'Customer Onboarding Automation',
        description: 'Multi-step customer onboarding process with external system integration',
        code: `// Screen Flow: Customer_Onboarding_Process
// Entry Point: Custom Lightning Component on Account Page

Screen 1: Welcome & Data Collection
├── Display Text: Welcome Message
├── Input Fields:
│   ├── Primary Contact (Lookup to Contact)
│   ├── Implementation Timeline (Picklist)
│   ├── Integration Requirements (Multi-select)
│   └── Special Requirements (Long Text)
└── Navigation: Next

Screen 2: Service Configuration  
├── Decision: Check Account Type
│   ├── Enterprise Account
│   │   ├── Display: Enterprise Services Options
│   │   └── Input: Dedicated CSM Required (Checkbox)
│   └── Standard Account
│       └── Display: Standard Services Options
├── Input Fields:
│   ├── Service Package (Picklist)
│   ├── Add-on Services (Multi-select)
│   └── Go-Live Date (Date)
└── Navigation: Previous | Next

Screen 3: Review & Confirmation
├── Display: Summary of Selections
├── Input: Final Confirmation (Checkbox)
└── Navigation: Previous | Submit

Post-Submission Logic:
├── Create Records: Onboarding Project
│   ├── Account__c = {recordId}
│   ├── Primary_Contact__c = {PrimaryContact}
│   ├── Timeline__c = {Timeline}
│   ├── Go_Live_Date__c = {GoLiveDate}
│   ├── Status__c = "Initiated"
│   └── Project_Manager__c = {AssignedPM}
├── Loop: Create Implementation Tasks
│   ├── Collection Variable: TaskTemplates
│   ├── For Each Task Template:
│   │   ├── Create Task Record
│   │   ├── Assign to Appropriate Team
│   │   └── Set Due Date Based on Timeline
│   └── End Loop
├── HTTP Callout: Provision External Systems
│   ├── Endpoint: /api/customer/provision
│   ├── Method: POST
│   ├── Body: Customer and Service Details
│   └── Error Handling: Log Failure & Create Manual Task
├── Platform Event: Customer_Onboarded
│   ├── Account_Id__c = {recordId}
│   ├── Project_Id__c = {OnboardingProject.Id}
│   └── Onboarding_Type__c = {ServicePackage}
└── Send Email: Welcome & Next Steps
    ├── To: {PrimaryContact.Email}
    ├── Template: Customer_Onboarding_Welcome
    └── Attachments: Implementation Guide`,
        language: 'yaml',
        explanation: 'This screen flow demonstrates a complete customer onboarding process with user interaction, complex business logic, external system integration, and comprehensive follow-up actions. The flow adapts based on account type, creates necessary records and tasks, provisions external systems, and triggers downstream processes through platform events.'
      }
    ],
    limitations: [
      'Flow interviews have governor limits (2,000 elements per interview)',
      'Flows cannot directly perform some operations like sending outbound messages',
      'Screen flows have session timeout limitations',
      'Complex flows can impact performance, especially with large data volumes',
      'Some advanced logic still requires custom Apex development'
    ],
    architecturalConsiderations: [
      'Design flows with governor limits in mind, especially for bulk operations',
      'Use platform events for loose coupling between processes',
      'Implement comprehensive error handling and logging strategies',
      'Consider flow versioning and deployment strategies in multi-org environments',
      'Plan for flow testing and quality assurance processes'
    ]
  },

  // SALESFORCE DEVELOPMENT
  {
    id: 'apex-fundamentals',
    title: 'Apex Programming Fundamentals',
    section: 'development',
    content: `
      <p>Apex is Salesforce's proprietary programming language, designed specifically for the Salesforce platform. It combines the familiar syntax of Java with cloud-specific features and built-in integration with Salesforce data and services. Understanding Apex fundamentals is crucial for any serious Salesforce development.</p>
      
      <h3>Language Characteristics</h3>
      <p>Apex is a strongly-typed, object-oriented language with several unique characteristics:</p>
      <ul>
        <li><strong>Cloud-based:</strong> Runs entirely on Salesforce servers with built-in multitenancy</li>
        <li><strong>Integrated:</strong> Native integration with Salesforce data, metadata, and services</li>
        <li><strong>Governed:</strong> Strict execution limits to ensure platform stability</li>
        <li><strong>Transactional:</strong> Built-in transaction management and rollback capabilities</li>
      </ul>
      
      <h3>Governor Limits Deep Dive</h3>
      <p>Governor limits are runtime limits enforced by the Apex runtime engine:</p>
      <ul>
        <li><strong>CPU Time:</strong> 10 seconds synchronous, 60 seconds asynchronous</li>
        <li><strong>SOQL Queries:</strong> 100 synchronous, 200 asynchronous</li>
        <li><strong>DML Statements:</strong> 150 per transaction</li>
        <li><strong>Heap Size:</strong> 6MB synchronous, 12MB asynchronous</li>
        <li><strong>Callouts:</strong> 100 per transaction, 120 seconds timeout</li>
      </ul>
      
      <h3>Advanced Apex Patterns</h3>
      <p>Enterprise Apex development requires sophisticated patterns:</p>
      <ul>
        <li><strong>Trigger Handler Pattern:</strong> Centralized trigger logic management</li>
        <li><strong>Service Layer Pattern:</strong> Business logic separation and reusability</li>
        <li><strong>Repository Pattern:</strong> Data access abstraction</li>
        <li><strong>Unit of Work Pattern:</strong> Transaction management and DML optimization</li>
      </ul>
    `,
    keyPoints: [
      'Always write bulkified code to handle multiple records efficiently',
      'Understand and respect governor limits in all development',
      'Use proper exception handling and logging for production code',
      'Implement comprehensive test coverage with meaningful assertions',
      'Follow Salesforce coding standards and best practices'
    ],
    examples: [
      {
        title: 'Enterprise Trigger Handler Framework',
        description: 'Scalable trigger management system for large organizations',
        code: `// Base Trigger Handler Class
public abstract class TriggerHandler {
    private static Set<String> bypassedHandlers = new Set<String>();
    private static Map<String, LoopCount> loopCountMap = new Map<String, LoopCount>();
    
    protected TriggerContext context;
    protected Boolean isTriggerExecuting;
    
    public TriggerHandler() {
        this.setTriggerContext();
    }
    
    public void run() {
        if (!validateRun()) return;
        
        addToLoopCount();
        
        if (context == TriggerContext.BEFORE_INSERT) {
            this.beforeInsert();
        } else if (context == TriggerContext.BEFORE_UPDATE) {
            this.beforeUpdate();
        } else if (context == TriggerContext.AFTER_INSERT) {
            this.afterInsert();
        } else if (context == TriggerContext.AFTER_UPDATE) {
            this.afterUpdate();
        } else if (context == TriggerContext.BEFORE_DELETE) {
            this.beforeDelete();
        } else if (context == TriggerContext.AFTER_DELETE) {
            this.afterDelete();
        } else if (context == TriggerContext.AFTER_UNDELETE) {
            this.afterUndelete();
        }
    }
    
    // Virtual methods to be overridden
    protected virtual void beforeInsert() {}
    protected virtual void beforeUpdate() {}
    protected virtual void afterInsert() {}
    protected virtual void afterUpdate() {}
    protected virtual void beforeDelete() {}
    protected virtual void afterDelete() {}
    protected virtual void afterUndelete() {}
    
    // Bypass mechanism for testing and special scenarios
    public static void bypass(String handlerName) {
        bypassedHandlers.add(handlerName);
    }
    
    public static void clearBypass(String handlerName) {
        bypassedHandlers.remove(handlerName);
    }
    
    private Boolean validateRun() {
        if (!this.isTriggerExecuting || this.context == null) {
            throw new TriggerHandlerException('Trigger handler called outside of Trigger execution');
        }
        
        if (bypassedHandlers.contains(getHandlerName())) {
            return false;
        }
        
        return true;
    }
    
    private void addToLoopCount() {
        String handlerName = getHandlerName();
        if (loopCountMap.containsKey(handlerName)) {
            Boolean exceeded = loopCountMap.get(handlerName).increment();
            if (exceeded) {
                Integer max = loopCountMap.get(handlerName).max;
                throw new TriggerHandlerException('Maximum loop count of ' + max + ' reached in ' + handlerName);
            }
        }
    }
    
    private String getHandlerName() {
        return String.valueOf(this).substring(0, String.valueOf(this).indexOf(':'));
    }
    
    private void setTriggerContext() {
        this.isTriggerExecuting = Trigger.isExecuting;
        if (!this.isTriggerExecuting) return;
        
        if (Trigger.isBefore && Trigger.isInsert) {
            this.context = TriggerContext.BEFORE_INSERT;
        } else if (Trigger.isBefore && Trigger.isUpdate) {
            this.context = TriggerContext.BEFORE_UPDATE;
        } else if (Trigger.isAfter && Trigger.isInsert) {
            this.context = TriggerContext.AFTER_INSERT;
        } else if (Trigger.isAfter && Trigger.isUpdate) {
            this.context = TriggerContext.AFTER_UPDATE;
        } else if (Trigger.isBefore && Trigger.isDelete) {
            this.context = TriggerContext.BEFORE_DELETE;
        } else if (Trigger.isAfter && Trigger.isDelete) {
            this.context = TriggerContext.AFTER_DELETE;
        } else if (Trigger.isAfter && Trigger.isUndelete) {
            this.context = TriggerContext.AFTER_UNDELETE;
        }
    }
    
    public class TriggerHandlerException extends Exception {}
    
    private enum TriggerContext {
        BEFORE_INSERT, BEFORE_UPDATE, BEFORE_DELETE,
        AFTER_INSERT, AFTER_UPDATE, AFTER_DELETE, AFTER_UNDELETE
    }
    
    private class LoopCount {
        private Integer max;
        private Integer count;
        
        public LoopCount() {
            this.max = 5;
            this.count = 0;
        }
        
        public LoopCount(Integer max) {
            this.max = max;
            this.count = 0;
        }
        
        public Boolean increment() {
            this.count++;
            return this.count >= this.max;
        }
    }
}

// Concrete Implementation
public class AccountTriggerHandler extends TriggerHandler {
    private List<Account> newAccounts;
    private List<Account> oldAccounts;
    private Map<Id, Account> newAccountMap;
    private Map<Id, Account> oldAccountMap;
    
    public AccountTriggerHandler() {
        this.newAccounts = (List<Account>) Trigger.new;
        this.oldAccounts = (List<Account>) Trigger.old;
        this.newAccountMap = (Map<Id, Account>) Trigger.newMap;
        this.oldAccountMap = (Map<Id, Account>) Trigger.oldMap;
    }
    
    protected override void beforeInsert() {
        AccountService.validateAccountData(this.newAccounts);
        AccountService.setDefaultValues(this.newAccounts);
    }
    
    protected override void beforeUpdate() {
        AccountService.validateAccountData(this.newAccounts);
        AccountService.handleOwnershipChanges(this.newAccounts, this.oldAccountMap);
    }
    
    protected override void afterInsert() {
        AccountService.createDefaultOpportunities(this.newAccounts);
        AccountService.notifyAccountTeam(this.newAccounts);
    }
    
    protected override void afterUpdate() {
        AccountService.handleStatusChanges(this.newAccounts, this.oldAccountMap);
        AccountService.syncWithExternalSystems(this.newAccounts, this.oldAccountMap);
    }
}`,
        language: 'apex',
        explanation: 'This enterprise trigger handler framework provides a robust foundation for managing complex trigger logic. It includes bypass mechanisms for testing, loop prevention, proper context handling, and a clean separation of concerns. The framework ensures consistent trigger behavior across the organization and makes triggers easier to maintain and test.'
      },
      {
        title: 'Advanced Service Layer Implementation',
        description: 'Business logic service with comprehensive error handling and bulkification',
        code: `// Service Layer with Unit of Work Pattern
public class OpportunityService {
    private static final String CLASS_NAME = 'OpportunityService';
    
    public static void processOpportunityClosures(List<Opportunity> opportunities, Map<Id, Opportunity> oldMap) {
        String methodName = 'processOpportunityClosures';
        LoggingService.logEntry(CLASS_NAME, methodName);
        
        try {
            List<Opportunity> closedWonOpps = new List<Opportunity>();
            List<Opportunity> closedLostOpps = new List<Opportunity>();
            
            // Separate opportunities by closure type
            for (Opportunity opp : opportunities) {
                Opportunity oldOpp = oldMap?.get(opp.Id);
                if (hasStageChanged(opp, oldOpp) && isClosedStage(opp.StageName)) {
                    if (opp.StageName == 'Closed Won') {
                        closedWonOpps.add(opp);
                    } else {
                        closedLostOpps.add(opp);
                    }
                }
            }
            
            if (!closedWonOpps.isEmpty()) {
                processClosedWonOpportunities(closedWonOpps);
            }
            
            if (!closedLostOpps.isEmpty()) {
                processClosedLostOpportunities(closedLostOpps);
            }
            
        } catch (Exception e) {
            LoggingService.logException(CLASS_NAME, methodName, e);
            throw new OpportunityServiceException('Error processing opportunity closures: ' + e.getMessage(), e);
        }
        
        LoggingService.logExit(CLASS_NAME, methodName);
    }
    
    private static void processClosedWonOpportunities(List<Opportunity> opportunities) {
        UnitOfWork uow = new UnitOfWork(new Schema.SObjectType[] {
            Contract.SObjectType,
            Task.SObjectType,
            OpportunityLineItem.SObjectType,
            Custom_Integration_Log__c.SObjectType
        });
        
        Set<Id> accountIds = new Set<Id>();
        Set<Id> opportunityIds = new Set<Id>();
        
        for (Opportunity opp : opportunities) {
            accountIds.add(opp.AccountId);
            opportunityIds.add(opp.Id);
        }
        
        // Fetch related data in bulk
        Map<Id, Account> accountMap = new Map<Id, Account>([
            SELECT Id, Name, Type, Industry, Owner.Email
            FROM Account 
            WHERE Id IN :accountIds
        ]);
        
        Map<Id, List<OpportunityLineItem>> oppLineItemsMap = groupLineItemsByOpportunity([
            SELECT Id, OpportunityId, Product2Id, Quantity, UnitPrice, Product2.Name
            FROM OpportunityLineItem 
            WHERE OpportunityId IN :opportunityIds
        ]);
        
        // Process each opportunity
        for (Opportunity opp : opportunities) {
            Account acc = accountMap.get(opp.AccountId);
            List<OpportunityLineItem> lineItems = oppLineItemsMap.get(opp.Id);
            
            // Create contract
            Contract contract = createContract(opp, acc);
            uow.registerNew(contract);
            
            // Create implementation tasks
            List<Task> tasks = createImplementationTasks(opp, acc);
            for (Task task : tasks) {
                uow.registerNew(task);
            }
            
            // Create product fulfillment records
            if (lineItems != null) {
                for (OpportunityLineItem lineItem : lineItems) {
                    Product_Fulfillment__c fulfillment = createProductFulfillment(lineItem, contract);
                    uow.registerNew(fulfillment);
                }
            }
            
            // Log integration requirement
            Custom_Integration_Log__c integrationLog = new Custom_Integration_Log__c(
                Record_Id__c = opp.Id,
                Integration_Type__c = 'Customer_Provisioning',
                Status__c = 'Pending',
                Payload__c = JSON.serialize(new CustomerProvisioningPayload(opp, acc, lineItems))
            );
            uow.registerNew(integrationLog);
        }
        
        // Commit all changes
        uow.commitWork();
        
        // Trigger async processes
        triggerAsyncProcesses(opportunities);
    }
    
    @future(callout=true)
    private static void triggerAsyncProcesses(List<Id> opportunityIds) {
        // External system notifications
        for (Id oppId : opportunityIds) {
            try {
                ExternalSystemService.notifyCustomerProvisioning(oppId);
            } catch (Exception e) {
                LoggingService.logException('OpportunityService', 'triggerAsyncProcesses', e);
                // Continue processing other opportunities
            }
        }
    }
    
    private static Boolean hasStageChanged(Opportunity newOpp, Opportunity oldOpp) {
        return oldOpp == null || newOpp.StageName != oldOpp.StageName;
    }
    
    private static Boolean isClosedStage(String stageName) {
        return stageName == 'Closed Won' || stageName == 'Closed Lost';
    }
    
    private static Map<Id, List<OpportunityLineItem>> groupLineItemsByOpportunity(List<OpportunityLineItem> lineItems) {
        Map<Id, List<OpportunityLineItem>> result = new Map<Id, List<OpportunityLineItem>>();
        for (OpportunityLineItem lineItem : lineItems) {
            if (!result.containsKey(lineItem.OpportunityId)) {
                result.put(lineItem.OpportunityId, new List<OpportunityLineItem>());
            }
            result.get(lineItem.OpportunityId).add(lineItem);
        }
        return result;
    }
    
    public class OpportunityServiceException extends Exception {}
    
    // Inner class for external system payload
    private class CustomerProvisioningPayload {
        public String opportunityId;
        public String accountName;
        public String accountType;
        public List<ProductInfo> products;
        
        public CustomerProvisioningPayload(Opportunity opp, Account acc, List<OpportunityLineItem> lineItems) {
            this.opportunityId = opp.Id;
            this.accountName = acc.Name;
            this.accountType = acc.Type;
            this.products = new List<ProductInfo>();
            
            if (lineItems != null) {
                for (OpportunityLineItem lineItem : lineItems) {
                    this.products.add(new ProductInfo(lineItem));
                }
            }
        }
    }
    
    private class ProductInfo {
        public String productId;
        public String productName;
        public Decimal quantity;
        public Decimal unitPrice;
        
        public ProductInfo(OpportunityLineItem lineItem) {
            this.productId = lineItem.Product2Id;
            this.productName = lineItem.Product2.Name;
            this.quantity = lineItem.Quantity;
            this.unitPrice = lineItem.UnitPrice;
        }
    }
}`,
        language: 'apex',
        explanation: 'This service layer implementation demonstrates enterprise-grade Apex development with proper separation of concerns, comprehensive error handling, bulkification, and the Unit of Work pattern. The code handles complex business logic while maintaining performance and reliability through proper data access patterns and async processing.'
      }
    ],
    limitations: [
      'CPU time limits can be restrictive for complex calculations',
      'Heap size limits affect large data processing capabilities',
      'SOQL query limits require careful query optimization',
      'Synchronous callout limitations in triggers and batch contexts',
      'No support for multi-threading or parallel processing'
    ],
    architecturalConsiderations: [
      'Design for bulkification from the beginning to avoid performance issues',
      'Implement proper logging and monitoring for production systems',
      'Use async processing (future, batch, queueable) for long-running operations',
      'Consider governor limits in architectural decisions and data volumes',
      'Plan for proper exception handling and recovery mechanisms'
    ]
  },
  {
    id: 'soql-sosl',
    title: 'SOQL & SOSL Query Optimization',
    section: 'development',
    content: `
      <p>Salesforce Object Query Language (SOQL) and Salesforce Object Search Language (SOSL) are the primary means of retrieving data from the Salesforce platform. Mastering these query languages is essential for building performant, scalable applications that work efficiently with large data volumes.</p>
      
      <h3>SOQL Advanced Concepts</h3>
      <p>Beyond basic SELECT statements, enterprise SOQL usage involves:</p>
      <ul>
        <li><strong>Relationship Queries:</strong> Parent-to-child and child-to-parent navigation</li>
        <li><strong>Aggregate Functions:</strong> COUNT, SUM, AVG, MIN, MAX with GROUP BY</li>
        <li><strong>Date Functions:</strong> Complex date filtering and grouping</li>
        <li><strong>Subqueries:</strong> Semi-joins and anti-joins for complex filtering</li>
        <li><strong>Dynamic SOQL:</strong> Runtime query construction with proper security</li>
      </ul>
      
      <h3>Query Performance Optimization</h3>
      <p>High-performance SOQL requires understanding of:</p>
      <ul>
        <li><strong>Selective Queries:</strong> Using indexed fields for efficient filtering</li>
        <li><strong>Query Plan Analysis:</strong> Understanding execution paths and costs</li>
        <li><strong>Custom Indexes:</strong> When and how to request custom indexes</li>
        <li><strong>Query Optimization:</strong> Rewriting queries for better performance</li>
      </ul>
      
      <h3>SOSL for Full-Text Search</h3>
      <p>SOSL provides powerful search capabilities across multiple objects:</p>
      <ul>
        <li><strong>Search Groups:</strong> ALL FIELDS, NAME FIELDS, EMAIL FIELDS, etc.</li>
        <li><strong>Search Modifiers:</strong> Wildcards, phrase matching, boolean operators</li>
        <li><strong>Result Filtering:</strong> WHERE clauses and field selection</li>
        <li><strong>Search Optimization:</strong> Improving search performance and relevance</li>
      </ul>
    `,
    keyPoints: [
      'Always use selective queries with indexed fields for large data volumes',
      'Understand relationship query limitations and performance implications',
      'Use aggregate queries to reduce data transfer and processing',
      'Implement proper SOQL injection prevention in dynamic queries',
      'Monitor query performance and optimize based on execution statistics'
    ],
    examples: [
      {
        title: 'Complex Sales Analytics Query',
        description: 'Advanced SOQL for comprehensive sales performance analysis',
        code: `// Complex Sales Performance Analysis Query
public class SalesAnalyticsService {
    
    public static List<SalesPerformanceData> getRegionalSalesPerformance(
        Date startDate, Date endDate, List<String> regions) {
        
        // Build dynamic WHERE clause for regions
        String regionFilter = '';
        if (regions != null && !regions.isEmpty()) {
            List<String> escapedRegions = new List<String>();
            for (String region : regions) {
                escapedRegions.add('\'' + String.escapeSingleQuotes(region) + '\'');
            }
            regionFilter = ' AND Account.Region__c IN (' + String.join(escapedRegions, ',') + ')';
        }
        
        String query = 
            'SELECT ' +
                'Account.Region__c Region, ' +
                'Owner.Name SalesRep, ' +
                'COUNT(Id) TotalOpportunities, ' +
                'COUNT_DISTINCT(AccountId) UniqueAccounts, ' +
                'SUM(Amount) TotalRevenue, ' +
                'AVG(Amount) AverageOpportunitySize, ' +
                'SUM(CASE WHEN StageName = \'Closed Won\' THEN Amount ELSE 0 END) WonRevenue, ' +
                'SUM(CASE WHEN StageName = \'Closed Won\' THEN 1 ELSE 0 END) WonCount, ' +
                'MIN(CloseDate) FirstCloseDate, ' +
                'MAX(CloseDate) LastCloseDate ' +
            'FROM Opportunity ' +
            'WHERE CloseDate >= :startDate ' +
                'AND CloseDate <= :endDate ' +
                'AND IsDeleted = false ' +
                regionFilter + ' ' +
            'GROUP BY Account.Region__c, Owner.Name ' +
            'ORDER BY Account.Region__c, SUM(Amount) DESC';
        
        List<AggregateResult> results = Database.query(query);
        return convertToSalesPerformanceData(results);
    }
    
    // Advanced relationship query with multiple levels
    public static List<Account> getAccountsWithOpportunityDetails(Set<Id> accountIds) {
        return [
            SELECT Id, Name, Type, Industry, AnnualRevenue,
                   Owner.Name, Owner.Email, Owner.Profile.Name,
                   Parent.Name, Parent.Type,
                   (SELECT Id, Name, StageName, Amount, CloseDate, 
                           Probability, Type, LeadSource,
                           Owner.Name, Owner.Email,
                           (SELECT Id, Product2.Name, Product2.Family, 
                                   Quantity, UnitPrice, TotalPrice
                            FROM OpportunityLineItems
                            ORDER BY Product2.Family, Product2.Name)
                    FROM Opportunities 
                    WHERE StageName NOT IN ('Closed Lost', 'Closed Won')
                    ORDER BY CloseDate ASC, Amount DESC
                    LIMIT 50),
                   (SELECT Id, FirstName, LastName, Email, Title, 
                           Phone, MobilePhone, Department
                    FROM Contacts 
                    WHERE IsDeleted = false
                    ORDER BY CreatedDate DESC
                    LIMIT 20)
            FROM Account 
            WHERE Id IN :accountIds
            ORDER BY Name
        ];
    }
    
    // Dynamic SOQL with security considerations
    public static List<SObject> searchRecords(String objectName, 
                                            Map<String, Object> filters, 
                                            List<String> fields,
                                            String orderBy,
                                            Integer limitCount) {
        
        // Validate object access
        Schema.SObjectType objectType = Schema.getGlobalDescribe().get(objectName);
        if (objectType == null || !objectType.getDescribe().isAccessible()) {
            throw new SecurityException('No access to object: ' + objectName);
        }
        
        // Validate field access
        Map<String, Schema.SObjectField> fieldMap = objectType.getDescribe().fields.getMap();
        List<String> validFields = new List<String>();
        for (String field : fields) {
            Schema.SObjectField fieldToken = fieldMap.get(field.toLowerCase());
            if (fieldToken != null && fieldToken.getDescribe().isAccessible()) {
                validFields.add(field);
            }
        }
        
        if (validFields.isEmpty()) {
            throw new SecurityException('No accessible fields specified');
        }
        
        // Build query
        String query = 'SELECT ' + String.join(validFields, ', ') + 
                      ' FROM ' + objectName;
        
        // Add WHERE clause
        if (filters != null && !filters.isEmpty()) {
            List<String> conditions = new List<String>();
            for (String field : filters.keySet()) {
                Schema.SObjectField fieldToken = fieldMap.get(field.toLowerCase());
                if (fieldToken != null && fieldToken.getDescribe().isFilterable()) {
                    Object value = filters.get(field);
                    if (value instanceof String) {
                        conditions.add(field + ' = \'' + String.escapeSingleQuotes((String)value) + '\'');
                    } else if (value instanceof List<Object>) {
                        List<String> escapedValues = new List<String>();
                        for (Object v : (List<Object>)value) {
                            escapedValues.add('\'' + String.escapeSingleQuotes(String.valueOf(v)) + '\'');
                        }
                        conditions.add(field + ' IN (' + String.join(escapedValues, ',') + ')');
                    } else {
                        conditions.add(field + ' = ' + value);
                    }
                }
            }
            
            if (!conditions.isEmpty()) {
                query += ' WHERE ' + String.join(conditions, ' AND ');
            }
        }
        
        // Add ORDER BY
        if (String.isNotBlank(orderBy)) {
            query += ' ORDER BY ' + orderBy;
        }
        
        // Add LIMIT
        if (limitCount != null && limitCount > 0) {
            query += ' LIMIT ' + limitCount;
        }
        
        return Database.query(query);
    }
    
    // Optimized query for large data volumes
    public static void processLargeDataSet(Date processDate) {
        // Use selective query with indexed fields
        String query = 
            'SELECT Id, AccountId, Amount, StageName, CloseDate ' +
            'FROM Opportunity ' +
            'WHERE LastModifiedDate >= :processDate ' +
                'AND StageName IN (\'Proposal/Price Quote\', \'Negotiation/Review\') ' +
                'AND Amount > 10000 ' +
            'ORDER BY LastModifiedDate ' +
            'LIMIT 10000';
        
        List<Opportunity> opportunities = Database.query(query);
        
        // Process in chunks to avoid heap size limits
        Integer chunkSize = 200;
        for (Integer i = 0; i < opportunities.size(); i += chunkSize) {
            Integer endIndex = Math.min(i + chunkSize, opportunities.size());
            List<Opportunity> chunk = opportunities.subList(i, endIndex);
            processOpportunityChunk(chunk);
        }
    }
    
    private static void processOpportunityChunk(List<Opportunity> opportunities) {
        // Process chunk logic here
        System.debug('Processing ' + opportunities.size() + ' opportunities');
    }
    
    private static List<SalesPerformanceData> convertToSalesPerformanceData(List<AggregateResult> results) {
        List<SalesPerformanceData> performanceData = new List<SalesPerformanceData>();
        
        for (AggregateResult result : results) {
            SalesPerformanceData data = new SalesPerformanceData();
            data.region = (String)result.get('Region');
            data.salesRep = (String)result.get('SalesRep');
            data.totalOpportunities = (Integer)result.get('TotalOpportunities');
            data.uniqueAccounts = (Integer)result.get('UniqueAccounts');
            data.totalRevenue = (Decimal)result.get('TotalRevenue');
            data.averageOpportunitySize = (Decimal)result.get('AverageOpportunitySize');
            data.wonRevenue = (Decimal)result.get('WonRevenue');
            data.wonCount = (Integer)result.get('WonCount');
            data.winRate = data.totalOpportunities > 0 ? 
                (Decimal)data.wonCount / data.totalOpportunities * 100 : 0;
            
            performanceData.add(data);
        }
        
        return performanceData;
    }
    
    public class SalesPerformanceData {
        public String region;
        public String salesRep;
        public Integer totalOpportunities;
        public Integer uniqueAccounts;
        public Decimal totalRevenue;
        public Decimal averageOpportunitySize;
        public Decimal wonRevenue;
        public Integer wonCount;
        public Decimal winRate;
    }
    
    public class SecurityException extends Exception {}
}`,
        language: 'apex',
        explanation: 'This comprehensive example demonstrates advanced SOQL techniques including aggregate functions, dynamic query building with security considerations, complex relationship queries, and optimization strategies for large data volumes. The code shows how to build flexible, secure, and performant data access layers in enterprise applications.'
      },
      {
        title: 'Advanced SOSL Search Implementation',
        description: 'Sophisticated search functionality with relevance scoring and filtering',
        code: `// Advanced Search Service with SOSL
public class AdvancedSearchService {
    
    public static SearchResults performGlobalSearch(String searchTerm, 
                                                  SearchFilters filters,
                                                  Integer maxResults) {
        
        // Sanitize search term
        String sanitizedTerm = sanitizeSearchTerm(searchTerm);
        if (String.isBlank(sanitizedTerm)) {
            return new SearchResults();
        }
        
        // Build SOSL query
        String soslQuery = buildSOSLQuery(sanitizedTerm, filters, maxResults);
        
        List<List<SObject>> searchResults = Search.query(soslQuery);
        
        return processSearchResults(searchResults, sanitizedTerm);
    }
    
    private static String buildSOSLQuery(String searchTerm, SearchFilters filters, Integer maxResults) {
        List<String> queryParts = new List<String>();
        
        // Main search clause
        queryParts.add('FIND \'' + searchTerm + '*\' IN ALL FIELDS');
        
        // Object specifications with field selection and filtering
        List<String> objectClauses = new List<String>();
        
        // Account search
        if (filters.includeAccounts) {
            String accountClause = 'Account(Id, Name, Type, Industry, Phone, Website, BillingCity, BillingState';
            if (filters.accountFilters != null && !filters.accountFilters.isEmpty()) {
                accountClause += ' WHERE ' + buildWhereClause(filters.accountFilters);
            }
            accountClause += ')';
            objectClauses.add(accountClause);
        }
        
        // Contact search
        if (filters.includeContacts) {
            String contactClause = 'Contact(Id, Name, Email, Phone, Title, Account.Name, Department';
            if (filters.contactFilters != null && !filters.contactFilters.isEmpty()) {
                contactClause += ' WHERE ' + buildWhereClause(filters.contactFilters);
            }
            contactClause += ')';
            objectClauses.add(contactClause);
        }
        
        // Opportunity search
        if (filters.includeOpportunities) {
            String oppClause = 'Opportunity(Id, Name, StageName, Amount, CloseDate, Account.Name, Owner.Name';
            if (filters.opportunityFilters != null && !filters.opportunityFilters.isEmpty()) {
                oppClause += ' WHERE ' + buildWhereClause(filters.opportunityFilters);
            }
            oppClause += ')';
            objectClauses.add(oppClause);
        }
        
        // Case search
        if (filters.includeCases) {
            String caseClause = 'Case(Id, CaseNumber, Subject, Status, Priority, Account.Name, Contact.Name';
            if (filters.caseFilters != null && !filters.caseFilters.isEmpty()) {
                caseClause += ' WHERE ' + buildWhereClause(filters.caseFilters);
            }
            caseClause += ')';
            objectClauses.add(caseClause);
        }
        
        // Knowledge articles
        if (filters.includeKnowledge) {
            objectClauses.add('KnowledgeArticleVersion(Id, Title, Summary, UrlName, PublishStatus WHERE PublishStatus = \'Online\' AND Language = \'en_US\')');
        }
        
        queryParts.add('RETURNING ' + String.join(objectClauses, ', '));
        
        // Add limit
        if (maxResults != null && maxResults > 0) {
            queryParts.add('LIMIT ' + Math.min(maxResults, 2000)); // SOSL limit is 2000
        }
        
        return String.join(queryParts, ' ');
    }
    
    private static String buildWhereClause(Map<String, Object> filters) {
        List<String> conditions = new List<String>();
        
        for (String field : filters.keySet()) {
            Object value = filters.get(field);
            if (value != null) {
                if (value instanceof String) {
                    conditions.add(field + ' = \'' + String.escapeSingleQuotes((String)value) + '\'');
                } else if (value instanceof List<Object>) {
                    List<String> escapedValues = new List<String>();
                    for (Object v : (List<Object>)value) {
                        escapedValues.add('\'' + String.escapeSingleQuotes(String.valueOf(v)) + '\'');
                    }
                    conditions.add(field + ' IN (' + String.join(escapedValues, ',') + ')');
                } else if (value instanceof Date) {
                    conditions.add(field + ' = ' + ((Date)value).format());
                } else {
                    conditions.add(field + ' = ' + value);
                }
            }
        }
        
        return String.join(conditions, ' AND ');
    }
    
    private static SearchResults processSearchResults(List<List<SObject>> searchResults, String searchTerm) {
        SearchResults results = new SearchResults();
        results.searchTerm = searchTerm;
        results.totalResults = 0;
        
        // Process each object type
        if (searchResults.size() > 0 && !searchResults[0].isEmpty()) {
            results.accounts = processAccountResults((List<Account>)searchResults[0], searchTerm);
            results.totalResults += results.accounts.size();
        }
        
        if (searchResults.size() > 1 && !searchResults[1].isEmpty()) {
            results.contacts = processContactResults((List<Contact>)searchResults[1], searchTerm);
            results.totalResults += results.contacts.size();
        }
        
        if (searchResults.size() > 2 && !searchResults[2].isEmpty()) {
            results.opportunities = processOpportunityResults((List<Opportunity>)searchResults[2], searchTerm);
            results.totalResults += results.opportunities.size();
        }
        
        if (searchResults.size() > 3 && !searchResults[3].isEmpty()) {
            results.cases = processCaseResults((List<Case>)searchResults[3], searchTerm);
            results.totalResults += results.cases.size();
        }
        
        if (searchResults.size() > 4 && !searchResults[4].isEmpty()) {
            results.knowledgeArticles = processKnowledgeResults((List<KnowledgeArticleVersion>)searchResults[4], searchTerm);
            results.totalResults += results.knowledgeArticles.size();
        }
        
        return results;
    }
    
    private static List<SearchResultItem> processAccountResults(List<Account> accounts, String searchTerm) {
        List<SearchResultItem> items = new List<SearchResultItem>();
        
        for (Account acc : accounts) {
            SearchResultItem item = new SearchResultItem();
            item.id = acc.Id;
            item.title = acc.Name;
            item.subtitle = acc.Type + ' • ' + acc.Industry;
            item.description = buildAccountDescription(acc);
            item.objectType = 'Account';
            item.relevanceScore = calculateRelevanceScore(acc.Name, searchTerm);
            item.url = '/' + acc.Id;
            
            items.add(item);
        }
        
        // Sort by relevance score
        items.sort(new RelevanceComparator());
        
        return items;
    }
    
    private static List<SearchResultItem> processContactResults(List<Contact> contacts, String searchTerm) {
        List<SearchResultItem> items = new List<SearchResultItem>();
        
        for (Contact con : contacts) {
            SearchResultItem item = new SearchResultItem();
            item.id = con.Id;
            item.title = con.Name;
            item.subtitle = con.Title + ' • ' + con.Account.Name;
            item.description = buildContactDescription(con);
            item.objectType = 'Contact';
            item.relevanceScore = calculateRelevanceScore(con.Name + ' ' + con.Email, searchTerm);
            item.url = '/' + con.Id;
            
            items.add(item);
        }
        
        items.sort(new RelevanceComparator());
        return items;
    }
    
    private static Integer calculateRelevanceScore(String text, String searchTerm) {
        if (String.isBlank(text) || String.isBlank(searchTerm)) {
            return 0;
        }
        
        String lowerText = text.toLowerCase();
        String lowerSearchTerm = searchTerm.toLowerCase();
        
        Integer score = 0;
        
        // Exact match gets highest score
        if (lowerText.equals(lowerSearchTerm)) {
            score += 100;
        }
        
        // Starts with search term
        if (lowerText.startsWith(lowerSearchTerm)) {
            score += 50;
        }
        
        // Contains search term
        if (lowerText.contains(lowerSearchTerm)) {
            score += 25;
        }
        
        // Word boundary matches
        List<String> searchWords = lowerSearchTerm.split(' ');
        for (String word : searchWords) {
            if (lowerText.contains(' ' + word + ' ') || lowerText.startsWith(word + ' ') || lowerText.endsWith(' ' + word)) {
                score += 10;
            }
        }
        
        return score;
    }
    
    private static String sanitizeSearchTerm(String searchTerm) {
        if (String.isBlank(searchTerm)) {
            return '';
        }
        
        // Remove special characters that could break SOSL
        String sanitized = searchTerm.replaceAll('[\\{\\}\\[\\]\\(\\)\\*\\+\\?\\^\\$\\|\\\\]', '');
        
        // Trim and limit length
        sanitized = sanitized.trim();
        if (sanitized.length() > 100) {
            sanitized = sanitized.substring(0, 100);
        }
        
        return sanitized;
    }
    
    // Inner classes for search results
    public class SearchResults {
        public String searchTerm;
        public Integer totalResults;
        public List<SearchResultItem> accounts = new List<SearchResultItem>();
        public List<SearchResultItem> contacts = new List<SearchResultItem>();
        public List<SearchResultItem> opportunities = new List<SearchResultItem>();
        public List<SearchResultItem> cases = new List<SearchResultItem>();
        public List<SearchResultItem> knowledgeArticles = new List<SearchResultItem>();
    }
    
    public class SearchResultItem {
        public String id;
        public String title;
        public String subtitle;
        public String description;
        public String objectType;
        public Integer relevanceScore;
        public String url;
    }
    
    public class SearchFilters {
        public Boolean includeAccounts = true;
        public Boolean includeContacts = true;
        public Boolean includeOpportunities = true;
        public Boolean includeCases = true;
        public Boolean includeKnowledge = false;
        
        public Map<String, Object> accountFilters;
        public Map<String, Object> contactFilters;
        public Map<String, Object> opportunityFilters;
        public Map<String, Object> caseFilters;
    }
    
    private class RelevanceComparator implements Comparator<SearchResultItem> {
        public Integer compare(SearchResultItem a, SearchResultItem b) {
            return b.relevanceScore - a.relevanceScore; // Descending order
        }
    }
}`,
        language: 'apex',
        explanation: 'This advanced SOSL implementation provides sophisticated search capabilities with relevance scoring, flexible filtering, and comprehensive result processing. The service demonstrates how to build enterprise-grade search functionality that can handle complex requirements while maintaining performance and security.'
      }
    ],
    limitations: [
      'SOQL has a maximum of 50,000 records returned per query',
      'Relationship queries are limited to 5 levels deep',
      'SOSL returns maximum 2,000 records across all objects',
      'Dynamic SOQL requires careful security consideration to prevent injection',
      'Some functions and operators are not available in all contexts'
    ],
    architecturalConsiderations: [
      'Design queries with selectivity in mind for large data volumes',
      'Consider custom indexes for frequently queried non-standard fields',
      'Implement query result caching for expensive, frequently-used queries',
      'Use aggregate queries to reduce data transfer and processing overhead',
      'Plan for query optimization and performance monitoring in production'
    ]
  },
  {
    id: 'testing-deployment',
    title: 'Testing Strategies & Deployment',
    section: 'development',
    content: `
      <p>Comprehensive testing and deployment strategies are critical for maintaining high-quality Salesforce applications in enterprise environments. Beyond the platform's 75% code coverage requirement, effective testing ensures reliability, maintainability, and business continuity.</p>
      
      <h3>Testing Pyramid for Salesforce</h3>
      <p>A well-structured testing approach follows the testing pyramid:</p>
      <ul>
        <li><strong>Unit Tests (70%):</strong> Test individual methods and classes in isolation</li>
        <li><strong>Integration Tests (20%):</strong> Test interactions between components</li>
        <li><strong>System Tests (10%):</strong> End-to-end testing of complete business processes</li>
      </ul>
      
      <h3>Advanced Testing Patterns</h3>
      <p>Enterprise testing requires sophisticated patterns:</p>
      <ul>
        <li><strong>Test Data Factory:</strong> Centralized test data creation with realistic relationships</li>
        <li><strong>Mock Framework:</strong> Isolating external dependencies and system interactions</li>
        <li><strong>Test Utilities:</strong> Reusable testing components and assertions</li>
        <li><strong>Performance Testing:</strong> Validating governor limit compliance and performance</li>
      </ul>
      
      <h3>Deployment Strategies</h3>
      <p>Modern Salesforce deployment involves:</p>
      <ul>
        <li><strong>Source-Driven Development:</strong> Using SFDX and version control</li>
        <li><strong>CI/CD Pipelines:</strong> Automated testing and deployment</li>
        <li><strong>Environment Management:</strong> Proper sandbox and production strategies</li>
        <li><strong>Release Management:</strong> Coordinated deployments with rollback capabilities</li>
      </ul>
    `,
    keyPoints: [
      'Achieve meaningful test coverage, not just the 75% minimum requirement',
      'Use test data factories to create consistent, realistic test data',
      'Implement proper mocking to isolate units under test',
      'Test both positive and negative scenarios, including edge cases',
      'Automate testing and deployment processes for consistency and reliability'
    ],
    examples: [
      {
        title: 'Comprehensive Test Data Factory',
        description: 'Enterprise-grade test data creation with realistic relationships and variations',
        code: `// Test Data Factory with Builder Pattern
@isTest
public class TestDataFactory {
    
    // Account Builder
    public class AccountBuilder {
        private Account acc;
        
        public AccountBuilder() {
            this.acc = new Account(
                Name = 'Test Account ' + generateRandomString(5),
                Type = 'Customer',
                Industry = 'Technology',
                AnnualRevenue = 1000000,
                NumberOfEmployees = 100,
                BillingStreet = '123 Test Street',
                BillingCity = 'San Francisco',
                BillingState = 'CA',
                BillingPostalCode = '94105',
                BillingCountry = 'USA',
                Phone = '(555) 123-4567',
                Website = 'www.testaccount.com'
            );
        }
        
        public AccountBuilder withName(String name) {
            this.acc.Name = name;
            return this;
        }
        
        public AccountBuilder withType(String accountType) {
            this.acc.Type = accountType;
            return this;
        }
        
        public AccountBuilder withIndustry(String industry) {
            this.acc.Industry = industry;
            return this;
        }
        
        public AccountBuilder withRevenue(Decimal revenue) {
            this.acc.AnnualRevenue = revenue;
            return this;
        }
        
        public AccountBuilder asEnterprise() {
            this.acc.Type = 'Customer';
            this.acc.AnnualRevenue = 10000000;
            this.acc.NumberOfEmployees = 1000;
            return this;
        }
        
        public AccountBuilder asProspect() {
            this.acc.Type = 'Prospect';
            this.acc.AnnualRevenue = null;
            return this;
        }
        
        public Account build() {
            return this.acc;
        }
        
        public Account create() {
            insert this.acc;
            return this.acc;
        }
    }
    
    // Contact Builder
    public class ContactBuilder {
        private Contact con;
        
        public ContactBuilder() {
            this.con = new Contact(
                FirstName = 'Test',
                LastName = 'Contact ' + generateRandomString(5),
                Email = 'test.contact.' + generateRandomString(5) + '@example.com',
                Phone = '(555) 987-6543',
                Title = 'Manager',
                Department = 'Sales'
            );
        }
        
        public ContactBuilder withAccount(Id accountId) {
            this.con.AccountId = accountId;
            return this;
        }
        
        public ContactBuilder withAccount(Account acc) {
            this.con.AccountId = acc.Id;
            return this;
        }
        
        public ContactBuilder withName(String firstName, String lastName) {
            this.con.FirstName = firstName;
            this.con.LastName = lastName;
            return this;
        }
        
        public ContactBuilder withEmail(String email) {
            this.con.Email = email;
            return this;
        }
        
        public ContactBuilder withTitle(String title) {
            this.con.Title = title;
            return this;
        }
        
        public ContactBuilder asDecisionMaker() {
            this.con.Title = 'CEO';
            this.con.Department = 'Executive';
            return this;
        }
        
        public Contact build() {
            return this.con;
        }
        
        public Contact create() {
            insert this.con;
            return this.con;
        }
    }
    
    // Opportunity Builder
    public class OpportunityBuilder {
        private Opportunity opp;
        
        public OpportunityBuilder() {
            this.opp = new Opportunity(
                Name = 'Test Opportunity ' + generateRandomString(5),
                StageName = 'Prospecting',
                CloseDate = Date.today().addDays(30),
                Amount = 50000,
                Probability = 10,
                Type = 'New Customer',
                LeadSource = 'Web'
            );
        }
        
        public OpportunityBuilder withAccount(Id accountId) {
            this.opp.AccountId = accountId;
            return this;
        }
        
        public OpportunityBuilder withAccount(Account acc) {
            this.opp.AccountId = acc.Id;
            return this;
        }
        
        public OpportunityBuilder withName(String name) {
            this.opp.Name = name;
            return this;
        }
        
        public OpportunityBuilder withStage(String stageName) {
            this.opp.StageName = stageName;
            // Set appropriate probability based on stage
            Map<String, Integer> stageProbabilities = new Map<String, Integer>{
                'Prospecting' => 10,
                'Qualification' => 25,
                'Needs Analysis' => 50,
                'Value Proposition' => 65,
                'Id. Decision Makers' => 75,
                'Proposal/Price Quote' => 90,
                'Negotiation/Review' => 95,
                'Closed Won' => 100,
                'Closed Lost' => 0
            };
            this.opp.Probability = stageProbabilities.get(stageName);
            return this;
        }
        
        public OpportunityBuilder withAmount(Decimal amount) {
            this.opp.Amount = amount;
            return this;
        }
        
        public OpportunityBuilder withCloseDate(Date closeDate) {
            this.opp.CloseDate = closeDate;
            return this;
        }
        
        public OpportunityBuilder asClosedWon() {
            this.opp.StageName = 'Closed Won';
            this.opp.Probability = 100;
            this.opp.CloseDate = Date.today().addDays(-5);
            return this;
        }
        
        public OpportunityBuilder asClosedLost() {
            this.opp.StageName = 'Closed Lost';
            this.opp.Probability = 0;
            this.opp.CloseDate = Date.today().addDays(-5);
            return this;
        }
        
        public Opportunity build() {
            return this.opp;
        }
        
        public Opportunity create() {
            insert this.opp;
            return this.opp;
        }
    }
    
    // Static factory methods for common scenarios
    public static Account createAccount() {
        return new AccountBuilder().create();
    }
    
    public static Account createAccount(String name) {
        return new AccountBuilder().withName(name).create();
    }
    
    public static List<Account> createAccounts(Integer count) {
        List<Account> accounts = new List<Account>();
        for (Integer i = 0; i < count; i++) {
            accounts.add(new AccountBuilder().build());
        }
        insert accounts;
        return accounts;
    }
    
    public static Contact createContact(Id accountId) {
        return new ContactBuilder().withAccount(accountId).create();
    }
    
    public static Opportunity createOpportunity(Id accountId) {
        return new OpportunityBuilder().withAccount(accountId).create();
    }
    
    // Complex scenario builders
    public static TestScenario createSalesScenario() {
        Account acc = new AccountBuilder()
            .withName('Enterprise Customer')
            .asEnterprise()
            .create();
            
        Contact primaryContact = new ContactBuilder()
            .withAccount(acc)
            .withName('John', 'Decision Maker')
            .asDecisionMaker()
            .create();
            
        Contact technicalContact = new ContactBuilder()
            .withAccount(acc)
            .withName('Jane', 'Technical Lead')
            .withTitle('CTO')
            .create();
            
        Opportunity opp = new OpportunityBuilder()
            .withAccount(acc)
            .withName('Enterprise Implementation')
            .withAmount(500000)
            .withStage('Proposal/Price Quote')
            .create();
            
        return new TestScenario(acc, new List<Contact>{primaryContact, technicalContact}, opp);
    }
    
    public static TestScenario createHighVolumeScenario(Integer accountCount, Integer contactsPerAccount, Integer oppsPerAccount) {
        List<Account> accounts = createAccounts(accountCount);
        List<Contact> allContacts = new List<Contact>();
        List<Opportunity> allOpportunities = new List<Opportunity>();
        
        for (Account acc : accounts) {
            // Create contacts
            List<Contact> contacts = new List<Contact>();
            for (Integer i = 0; i < contactsPerAccount; i++) {
                contacts.add(new ContactBuilder().withAccount(acc).build());
            }
            insert contacts;
            allContacts.addAll(contacts);
            
            // Create opportunities
            List<Opportunity> opportunities = new List<Opportunity>();
            for (Integer i = 0; i < oppsPerAccount; i++) {
                opportunities.add(new OpportunityBuilder().withAccount(acc).build());
            }
            insert opportunities;
            allOpportunities.addAll(opportunities);
        }
        
        return new TestScenario(accounts, allContacts, allOpportunities);
    }
    
    // Utility methods
    private static String generateRandomString(Integer length) {
        String chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        String result = '';
        for (Integer i = 0; i < length; i++) {
            result += chars.substring(Math.mod(Math.abs(Crypto.getRandomInteger()), chars.length()), Math.mod(Math.abs(Crypto.getRandomInteger()), chars.length()) + 1);
        }
        return result;
    }
    
    // Builder accessors
    public static AccountBuilder anAccount() {
        return new AccountBuilder();
    }
    
    public static ContactBuilder aContact() {
        return new ContactBuilder();
    }
    
    public static OpportunityBuilder anOpportunity() {
        return new OpportunityBuilder();
    }
    
    // Test scenario container
    public class TestScenario {
        public List<Account> accounts;
        public List<Contact> contacts;
        public List<Opportunity> opportunities;
        
        public TestScenario(Account account, List<Contact> contacts, Opportunity opportunity) {
            this.accounts = new List<Account>{account};
            this.contacts = contacts;
            this.opportunities = new List<Opportunity>{opportunity};
        }
        
        public TestScenario(List<Account> accounts, List<Contact> contacts, List<Opportunity> opportunities) {
            this.accounts = accounts;
            this.contacts = contacts;
            this.opportunities = opportunities;
        }
        
        public Account getPrimaryAccount() {
            return accounts.isEmpty() ? null : accounts[0];
        }
        
        public Contact getPrimaryContact() {
            return contacts.isEmpty() ? null : contacts[0];
        }
        
        public Opportunity getPrimaryOpportunity() {
            return opportunities.isEmpty() ? null : opportunities[0];
        }
    }
}`,
        language: 'apex',
        explanation: 'This comprehensive test data factory uses the Builder pattern to create flexible, maintainable test data. It provides both simple factory methods for quick test setup and sophisticated builders for complex scenarios. The factory ensures consistent, realistic test data while allowing customization for specific test requirements.'
      },
      {
        title: 'Advanced Test Class with Mocking',
        description: 'Comprehensive test class demonstrating mocking, performance testing, and edge case coverage',
        code: `// Advanced Test Class with Comprehensive Coverage
@isTest
private class OpportunityServiceTest {
    
    @testSetup
    static void setupTestData() {
        // Create test data using factory
        TestDataFactory.TestScenario scenario = TestDataFactory.createSalesScenario();
        
        // Create additional test records for bulk testing
        TestDataFactory.createHighVolumeScenario(5, 3, 2);
    }
    
    @isTest
    static void testProcessOpportunityClosures_ClosedWon_Success() {
        // Given
        Account testAccount = TestDataFactory.createAccount('Test Account');
        Opportunity opp = TestDataFactory.anOpportunity()
            .withAccount(testAccount)
            .withName('Test Opportunity')
            .withAmount(100000)
            .withStage('Proposal/Price Quote')
            .create();
        
        // Mock external service calls
        Test.setMock(HttpCalloutMock.class, new MockExternalSystemService());
        
        // When
        Test.startTest();
        opp.StageName = 'Closed Won';
        update opp;
        Test.stopTest();
        
        // Then
        // Verify contract creation
        List<Contract> contracts = [SELECT Id, AccountId, Status FROM Contract WHERE AccountId = :testAccount.Id];
        System.assertEquals(1, contracts.size(), 'Contract should be created for closed won opportunity');
        System.assertEquals('Draft', contracts[0].Status, 'Contract should be in Draft status');
        
        // Verify task creation
        List<Task> tasks = [SELECT Id, Subject, WhatId FROM Task WHERE WhatId = :opp.Id];
        System.assertNotEquals(0, tasks.size(), 'Implementation tasks should be created');
        
        // Verify integration log
        List<Custom_Integration_Log__c> logs = [SELECT Id, Integration_Type__c, Status__c FROM Custom_Integration_Log__c WHERE Record_Id__c = :opp.Id];
        System.assertEquals(1, logs.size(), 'Integration log should be created');
        System.assertEquals('Customer_Provisioning', logs[0].Integration_Type__c);
    }
    
    @isTest
    static void testProcessOpportunityClosures_ClosedLost_Success() {
        // Given
        Account testAccount = TestDataFactory.createAccount('Test Account');
        Opportunity opp = TestDataFactory.anOpportunity()
            .withAccount(testAccount)
            .withStage('Negotiation/Review')
            .create();
        
        // When
        Test.startTest();
        opp.StageName = 'Closed Lost';
        opp.Loss_Reason__c = 'Price';
        update opp;
        Test.stopTest();
        
        // Then
        // Verify no contract creation for closed lost
        List<Contract> contracts = [SELECT Id FROM Contract WHERE AccountId = :testAccount.Id];
        System.assertEquals(0, contracts.size(), 'No contract should be created for closed lost opportunity');
        
        // Verify follow-up task creation
        List<Task> followUpTasks = [SELECT Id, Subject FROM Task WHERE WhatId = :opp.Id AND Subject LIKE '%Follow-up%'];
        System.assertNotEquals(0, followUpTasks.size(), 'Follow-up tasks should be created for closed lost opportunities');
    }
    
    @isTest
    static void testProcessOpportunityClosures_BulkProcessing() {
        // Given
        List<Account> accounts = TestDataFactory.createAccounts(10);
        List<Opportunity> opportunities = new List<Opportunity>();
        
        for (Account acc : accounts) {
            opportunities.add(TestDataFactory.anOpportunity()
                .withAccount(acc)
                .withStage('Proposal/Price Quote')
                .build());
        }
        insert opportunities;
        
        // Mock external service
        Test.setMock(HttpCalloutMock.class, new MockExternalSystemService());
        
        // When
        Test.startTest();
        for (Opportunity opp : opportunities) {
            opp.StageName = 'Closed Won';
        }
        update opportunities;
        Test.stopTest();
        
        // Then
        // Verify bulk processing worked correctly
        List<Contract> contracts = [SELECT Id, AccountId FROM Contract WHERE AccountId IN :new Map<Id, Account>(accounts).keySet()];
        System.assertEquals(10, contracts.size(), 'Contracts should be created for all closed won opportunities');
        
        // Verify governor limits weren't exceeded
        System.assert(Limits.getQueries() < Limits.getLimitQueries(), 'SOQL queries should be within limits');
        System.assert(Limits.getDMLStatements() < Limits.getLimitDMLStatements(), 'DML statements should be within limits');
    }
    
    @isTest
    static void testProcessOpportunityClosures_ExceptionHandling() {
        // Given
        Account testAccount = TestDataFactory.createAccount('Test Account');
        Opportunity opp = TestDataFactory.anOpportunity()
            .withAccount(testAccount)
            .withStage('Proposal/Price Quote')
            .create();
        
        // Mock external service to throw exception
        Test.setMock(HttpCalloutMock.class, new MockExternalSystemServiceException());
        
        // When/Then
        Test.startTest();
        try {
            opp.StageName = 'Closed Won';
            update opp;
            System.assert(false, 'Exception should have been thrown');
        } catch (Exception e) {
            System.assert(e.getMessage().contains('Error processing opportunity closures'), 'Proper exception message should be thrown');
        }
        Test.stopTest();
    }
    
    @isTest
    static void testProcessOpportunityClosures_PerformanceTest() {
        // Given - Create large dataset
        List<Account> accounts = TestDataFactory.createAccounts(200);
        List<Opportunity> opportunities = new List<Opportunity>();
        
        for (Account acc : accounts) {
            opportunities.add(TestDataFactory.anOpportunity()
                .withAccount(acc)
                .withAmount(Math.random() * 1000000)
                .withStage('Proposal/Price Quote')
                .build());
        }
        insert opportunities;
        
        Test.setMock(HttpCalloutMock.class, new MockExternalSystemService());
        
        // When
        Test.startTest();
        Long startTime = System.currentTimeMillis();
        
        for (Opportunity opp : opportunities) {
            opp.StageName = 'Closed Won';
        }
        update opportunities;
        
        Long endTime = System.currentTimeMillis();
        Test.stopTest();
        
        // Then - Verify performance and governor limits
        System.debug('Processing time: ' + (endTime - startTime) + 'ms');
        System.assert(Limits.getQueries() < Limits.getLimitQueries() * 0.8, 'Should use less than 80% of SOQL limit');
        System.assert(Limits.getDMLStatements() < Limits.getLimitDMLStatements() * 0.8, 'Should use less than 80% of DML limit');
        System.assert(Limits.getHeapSize() < Limits.getLimitHeapSize() * 0.8, 'Should use less than 80% of heap limit');
    }
    
    @isTest
    static void testProcessOpportunityClosures_EdgeCases() {
        // Test null values
        Account testAccount = TestDataFactory.createAccount();
        Opportunity oppWithNulls = new Opportunity(
            Name = 'Test Opp',
            AccountId = testAccount.Id,
            StageName = 'Prospecting',
            CloseDate = Date.today().addDays(30),
            Amount = null // Null amount
        );
        insert oppWithNulls;
        
        Test.startTest();
        oppWithNulls.StageName = 'Closed Won';
        update oppWithNulls;
        Test.stopTest();
        
        // Should handle null amount gracefully
        List<Contract> contracts = [SELECT Id FROM Contract WHERE AccountId = :testAccount.Id];
        System.assertEquals(1, contracts.size(), 'Contract should still be created even with null amount');
    }
    
    @isTest
    static void testProcessOpportunityClosures_SecurityTest() {
        // Create user with limited permissions
        User limitedUser = createTestUser('Standard User');
        
        Account testAccount = TestDataFactory.createAccount();
        Opportunity opp = TestDataFactory.anOpportunity()
            .withAccount(testAccount)
            .withStage('Proposal/Price Quote')
            .create();
        
        System.runAs(limitedUser) {
            Test.startTest();
            try {
                opp.StageName = 'Closed Won';
                update opp;
                // Should handle security exceptions gracefully
            } catch (Exception e) {
                System.assert(e instanceof DmlException, 'Should throw DML exception for insufficient permissions');
            }
            Test.stopTest();
        }
    }
    
    // Mock classes for external dependencies
    private class MockExternalSystemService implements HttpCalloutMock {
        public HTTPResponse respond(HTTPRequest req) {
            HttpResponse res = new HttpResponse();
            res.setHeader('Content-Type', 'application/json');
            res.setBody('{"status": "success", "customerId": "12345"}');
            res.setStatusCode(200);
            return res;
        }
    }
    
    private class MockExternalSystemServiceException implements HttpCalloutMock {
        public HTTPResponse respond(HTTPRequest req) {
            HttpResponse res = new HttpResponse();
            res.setStatusCode(500);
            res.setBody('{"error": "Internal Server Error"}');
            return res;
        }
    }
    
    // Utility method to create test users
    private static User createTestUser(String profileName) {
        Profile profile = [SELECT Id FROM Profile WHERE Name = :profileName LIMIT 1];
        
        User testUser = new User(
            FirstName = 'Test',
            LastName = 'User',
            Email = 'testuser@example.com',
            Username = 'testuser' + System.currentTimeMillis() + '@example.com',
            Alias = 'tuser',
            TimeZoneSidKey = 'America/New_York',
            LocaleSidKey = 'en_US',
            EmailEncodingKey = 'UTF-8',
            LanguageLocaleKey = 'en_US',
            ProfileId = profile.Id
        );
        
        insert testUser;
        return testUser;
    }
}`,
        language: 'apex',
        explanation: 'This comprehensive test class demonstrates enterprise-level testing practices including proper test data setup, mocking external dependencies, bulk testing, performance validation, exception handling, edge case coverage, and security testing. The tests provide meaningful assertions and validate both functional and non-functional requirements.'
      }
    ],
    limitations: [
      'Test methods cannot make real HTTP callouts without mock implementations',
      'Test data is isolated and cannot access production data',
      'Some system features like email sending are disabled in test context',
      'Test execution time limits can affect complex test scenarios',
      'Governor limits still apply in test context, though some are increased'
    ],
    architecturalConsiderations: [
      'Design testable code with proper separation of concerns and dependency injection',
      'Implement comprehensive test data factories for consistent test setup',
      'Use continuous integration to run tests automatically on code changes',
      'Monitor test execution time and optimize slow-running tests',
      'Maintain test environments that mirror production configurations'
    ]
  },

  // INTEGRATION PATTERNS
  {
    id: 'rest-api',
    title: 'REST API Integration Patterns',
    section: 'integration',
    content: `
      <p>REST API integration is fundamental to modern Salesforce implementations, enabling seamless data exchange between Salesforce and external systems. Understanding both inbound and outbound integration patterns is crucial for building robust, scalable enterprise solutions.</p>
      
      <h3>Salesforce REST API Capabilities</h3>
      <p>Salesforce provides comprehensive REST APIs for various purposes:</p>
      <ul>
        <li><strong>REST API:</strong> Standard CRUD operations on Salesforce objects</li>
        <li><strong>Bulk API 2.0:</strong> High-volume data operations with improved performance</li>
        <li><strong>Composite API:</strong> Multiple operations in a single request</li>
        <li><strong>GraphQL API:</strong> Flexible data querying with precise field selection</li>
        <li><strong>Streaming API:</strong> Real-time data synchronization</li>
      </ul>
      
      <h3>Integration Architecture Patterns</h3>
      <p>Enterprise integrations require sophisticated architectural patterns:</p>
      <ul>
        <li><strong>Request-Response:</strong> Synchronous communication for immediate results</li>
        <li><strong>Fire-and-Forget:</strong> Asynchronous processing for non-critical operations</li>
        <li><strong>Batch Processing:</strong> Scheduled bulk data synchronization</li>
        <li><strong>Event-Driven:</strong> Real-time integration using Platform Events</li>
        <li><strong>API Gateway:</strong> Centralized API management and security</li>
      </ul>
      
      <h3>Security and Authentication</h3>
      <p>Secure API integration involves multiple layers:</p>
      <ul>
        <li><strong>OAuth 2.0:</strong> Industry-standard authorization framework</li>
        <li><strong>JWT Bearer Tokens:</strong> Secure, stateless authentication</li>
        <li><strong>Connected Apps:</strong> Salesforce-specific OAuth configuration</li>
        <li><strong>API Security:</strong> Rate limiting, IP restrictions, and monitoring</li>
      </ul>
    `,
    keyPoints: [
      'Use appropriate authentication methods based on integration patterns and security requirements',
      'Implement proper error handling and retry logic for resilient integrations',
      'Design for idempotency to handle duplicate requests safely',
      'Monitor API usage and performance to ensure optimal system health',
      'Follow REST principles and use appropriate HTTP methods and status codes'
    ],
    examples: [
      {
        title: 'Enterprise ERP Integration Service',
        description: 'Bidirectional integration between Salesforce and enterprise ERP system',
        code: `// Comprehensive ERP Integration Service
public class ERPIntegrationService {
    private static final String ERP_BASE_URL = 'https://erp.company.com/api/v2';
    private static final String INTEGRATION_USER = 'ERP_Integration_User';
    
    // Outbound: Sync Account to ERP
    @future(callout=true)
    public static void syncAccountToERP(Id accountId, String operation) {
        try {
            Account acc = getAccountWithDetails(accountId);
            if (acc == null) {
                logError('Account not found: ' + accountId);
                return;
            }
            
            ERPCustomerPayload payload = buildERPCustomerPayload(acc);
            HttpResponse response = null;
            
            switch on operation {
                when 'CREATE' {
                    response = createERPCustomer(payload);
                }
                when 'UPDATE' {
                    response = updateERPCustomer(payload);
                }
                when 'DELETE' {
                    response = deleteERPCustomer(acc.ERP_Customer_ID__c);
                }
            }
            
            handleERPResponse(acc, response, operation);
            
        } catch (Exception e) {
            logError('ERP sync failed for Account ' + accountId + ': ' + e.getMessage());
            createIntegrationErrorRecord(accountId, 'Account', operation, e.getMessage());
        }
    }
    
    // Inbound: REST endpoint for ERP updates
    @RestResource(urlMapping='/erp/customer/*')
    global class ERPCustomerWebService {
        
        @HttpPost
        global static IntegrationResponse createOrUpdateCustomer() {
            RestRequest req = RestContext.request;
            RestResponse res = RestContext.response;
            
            try {
                // Parse incoming payload
                ERPCustomerPayload payload = (ERPCustomerPayload)JSON.deserialize(
                    req.requestBody.toString(), ERPCustomerPayload.class);
                
                // Validate payload
                ValidationResult validation = validateERPPayload(payload);
                if (!validation.isValid) {
                    res.statusCode = 400;
                    return new IntegrationResponse(false, validation.errorMessage, null);
                }
                
                // Find or create Account
                Account acc = findAccountByERPId(payload.erpCustomerId);
                Boolean isUpdate = (acc != null);
                
                if (acc == null) {
                    acc = new Account();
                }
                
                // Map ERP data to Salesforce Account
                mapERPDataToAccount(payload, acc);
                
                // Upsert Account
                Database.UpsertResult result = Database.upsert(acc, Account.ERP_Customer_ID__c);
                
                if (result.isSuccess()) {
                    // Create or update related records
                    processRelatedRecords(acc.Id, payload);
                    
                    res.statusCode = isUpdate ? 200 : 201;
                    return new IntegrationResponse(true, 
                        isUpdate ? 'Customer updated successfully' : 'Customer created successfully', 
                        acc.Id);
                } else {
                    res.statusCode = 500;
                    return new IntegrationResponse(false, 
                        'Failed to save customer: ' + result.getErrors()[0].getMessage(), 
                        null);
                }
                
            } catch (Exception e) {
                res.statusCode = 500;
                logError('Inbound ERP integration failed: ' + e.getMessage());
                return new IntegrationResponse(false, 'Internal server error', null);
            }
        }
        
        @HttpGet
        global static IntegrationResponse getCustomer() {
            RestRequest req = RestContext.request;
            RestResponse res = RestContext.response;
            
            try {
                String erpCustomerId = req.requestURI.substring(req.requestURI.lastIndexOf('/') + 1);
                
                Account acc = findAccountByERPId(erpCustomerId);
                if (acc == null) {
                    res.statusCode = 404;
                    return new IntegrationResponse(false, 'Customer not found', null);
                }
                
                ERPCustomerPayload payload = buildERPCustomerPayload(acc);
                res.statusCode = 200;
                return new IntegrationResponse(true, 'Customer retrieved successfully', payload);
                
            } catch (Exception e) {
                res.statusCode = 500;
                return new IntegrationResponse(false, 'Internal server error', null);
            }
        }
    }
    
    // HTTP Client Methods
    private static HttpResponse createERPCustomer(ERPCustomerPayload payload) {
        HttpRequest req = new HttpRequest();
        req.setEndpoint(ERP_BASE_URL + '/customers');
        req.setMethod('POST');
        req.setHeader('Content-Type', 'application/json');
        req.setHeader('Authorization', 'Bearer ' + getERPAccessToken());
        req.setBody(JSON.serialize(payload));
        req.setTimeout(30000);
        
        Http http = new Http();
        return http.send(req);
    }
    
    private static HttpResponse updateERPCustomer(ERPCustomerPayload payload) {
        HttpRequest req = new HttpRequest();
        req.setEndpoint(ERP_BASE_URL + '/customers/' + payload.erpCustomerId);
        req.setMethod('PUT');
        req.setHeader('Content-Type', 'application/json');
        req.setHeader('Authorization', 'Bearer ' + getERPAccessToken());
        req.setBody(JSON.serialize(payload));
        req.setTimeout(30000);
        
        Http http = new Http();
        return http.send(req);
    }
    
    private static HttpResponse deleteERPCustomer(String erpCustomerId) {
        HttpRequest req = new HttpRequest();
        req.setEndpoint(ERP_BASE_URL + '/customers/' + erpCustomerId);
        req.setMethod('DELETE');
        req.setHeader('Authorization', 'Bearer ' + getERPAccessToken());
        req.setTimeout(30000);
        
        Http http = new Http();
        return http.send(req);
    }
    
    // Token Management with Caching
    private static String getERPAccessToken() {
        // Check cache first
        String cachedToken = Cache.Org.get('ERP_ACCESS_TOKEN');
        if (String.isNotBlank(cachedToken)) {
            return cachedToken;
        }
        
        // Get new token
        ERP_Integration_Settings__c settings = ERP_Integration_Settings__c.getOrgDefaults();
        
        HttpRequest req = new HttpRequest();
        req.setEndpoint(settings.Token_Endpoint__c);
        req.setMethod('POST');
        req.setHeader('Content-Type', 'application/x-www-form-urlencoded');
        
        String body = 'grant_type=client_credentials' +
                     '&client_id=' + EncodingUtil.urlEncode(settings.Client_Id__c, 'UTF-8') +
                     '&client_secret=' + EncodingUtil.urlEncode(settings.Client_Secret__c, 'UTF-8');
        req.setBody(body);
        
        Http http = new Http();
        HttpResponse res = http.send(req);
        
        if (res.getStatusCode() == 200) {
            Map<String, Object> tokenResponse = (Map<String, Object>)JSON.deserializeUntyped(res.getBody());
            String accessToken = (String)tokenResponse.get('access_token');
            Integer expiresIn = (Integer)tokenResponse.get('expires_in');
            
            // Cache token for 90% of its lifetime
            Cache.Org.put('ERP_ACCESS_TOKEN', accessToken, expiresIn * 900);
            
            return accessToken;
        } else {
            throw new IntegrationException('Failed to obtain ERP access token: ' + res.getBody());
        }
    }
    
    // Data Mapping Methods
    private static ERPCustomerPayload buildERPCustomerPayload(Account acc) {
        ERPCustomerPayload payload = new ERPCustomerPayload();
        payload.erpCustomerId = acc.ERP_Customer_ID__c;
        payload.salesforceId = acc.Id;
        payload.name = acc.Name;
        payload.type = acc.Type;
        payload.industry = acc.Industry;
        payload.annualRevenue = acc.AnnualRevenue;
        payload.numberOfEmployees = acc.NumberOfEmployees;
        
        // Address information
        payload.address = new ERPAddress();
        payload.address.street = acc.BillingStreet;
        payload.address.city = acc.BillingCity;
        payload.address.state = acc.BillingState;
        payload.address.postalCode = acc.BillingPostalCode;
        payload.address.country = acc.BillingCountry;
        
        // Contact information
        payload.phone = acc.Phone;
        payload.website = acc.Website;
        
        // Custom fields
        payload.customFields = new Map<String, Object>();
        payload.customFields.put('creditLimit', acc.Credit_Limit__c);
        payload.customFields.put('paymentTerms', acc.Payment_Terms__c);
        payload.customFields.put('taxId', acc.Tax_ID__c);
        
        return payload;
    }
    
    private static void mapERPDataToAccount(ERPCustomerPayload payload, Account acc) {
        acc.ERP_Customer_ID__c = payload.erpCustomerId;
        acc.Name = payload.name;
        acc.Type = payload.type;
        acc.Industry = payload.industry;
        acc.AnnualRevenue = payload.annualRevenue;
        acc.NumberOfEmployees = payload.numberOfEmployees;
        
        if (payload.address != null) {
            acc.BillingStreet = payload.address.street;
            acc.BillingCity = payload.address.city;
            acc.BillingState = payload.address.state;
            acc.BillingPostalCode = payload.address.postalCode;
            acc.BillingCountry = payload.address.country;
        }
        
        acc.Phone = payload.phone;
        acc.Website = payload.website;
        
        // Map custom fields
        if (payload.customFields != null) {
            acc.Credit_Limit__c = (Decimal)payload.customFields.get('creditLimit');
            acc.Payment_Terms__c = (String)payload.customFields.get('paymentTerms');
            acc.Tax_ID__c = (String)payload.customFields.get('taxId');
        }
        
        // Set integration metadata
        acc.ERP_Last_Sync__c = System.now();
        acc.ERP_Sync_Status__c = 'Success';
    }
    
    // Utility Methods
    private static Account getAccountWithDetails(Id accountId) {
        List<Account> accounts = [
            SELECT Id, Name, Type, Industry, AnnualRevenue, NumberOfEmployees,
                   BillingStreet, BillingCity, BillingState, BillingPostalCode, BillingCountry,
                   Phone, Website, ERP_Customer_ID__c, Credit_Limit__c, Payment_Terms__c, Tax_ID__c
            FROM Account 
            WHERE Id = :accountId
            LIMIT 1
        ];
        
        return accounts.isEmpty() ? null : accounts[0];
    }
    
    private static Account findAccountByERPId(String erpCustomerId) {
        List<Account> accounts = [
            SELECT Id, Name, Type, Industry, AnnualRevenue, NumberOfEmployees,
                   BillingStreet, BillingCity, BillingState, BillingPostalCode, BillingCountry,
                   Phone, Website, ERP_Customer_ID__c, Credit_Limit__c, Payment_Terms__c, Tax_ID__c
            FROM Account 
            WHERE ERP_Customer_ID__c = :erpCustomerId
            LIMIT 1
        ];
        
        return accounts.isEmpty() ? null : accounts[0];
    }
    
    // Data Classes
    public class ERPCustomerPayload {
        public String erpCustomerId;
        public String salesforceId;
        public String name;
        public String type;
        public String industry;
        public Decimal annualRevenue;
        public Integer numberOfEmployees;
        public ERPAddress address;
        public String phone;
        public String website;
        public Map<String, Object> customFields;
    }
    
    public class ERPAddress {
        public String street;
        public String city;
        public String state;
        public String postalCode;
        public String country;
    }
    
    global class IntegrationResponse {
        global Boolean success;
        global String message;
        global Object data;
        
        global IntegrationResponse(Boolean success, String message, Object data) {
            this.success = success;
            this.message = message;
            this.data = data;
        }
    }
    
    public class IntegrationException extends Exception {}
}`,
        language: 'apex',
        explanation: 'This comprehensive ERP integration service demonstrates enterprise-level REST API integration patterns including bidirectional data sync, proper authentication with token caching, robust error handling, and flexible data mapping. The service handles both outbound callouts to external systems and inbound REST endpoints for receiving data updates.'
      },
      {
        title: 'Advanced API Gateway Pattern',
        description: 'Centralized API management with rate limiting, monitoring, and security',
        code: `// API Gateway Service for Centralized Integration Management
public class APIGatewayService {
    
    private static final Map<String, APIEndpointConfig> ENDPOINT_CONFIGS = new Map<String, APIEndpointConfig>{
        'ERP' => new APIEndpointConfig('https://erp.company.com/api/v2', 'ERP_CREDENTIALS', 1000, 60),
        'CRM' => new APIEndpointConfig('https://crm.partner.com/api/v1', 'CRM_CREDENTIALS', 500, 60),
        'MARKETING' => new APIEndpointConfig('https://marketing.platform.com/api', 'MARKETING_CREDENTIALS', 2000, 60),
        'FINANCE' => new APIEndpointConfig('https://finance.system.com/api/v3', 'FINANCE_CREDENTIALS', 100, 60)
    };
    
    // Main API Gateway Method
    public static APIGatewayResponse makeAPICall(APIGatewayRequest request) {
        String requestId = generateRequestId();
        
        try {
            // Validate request
            ValidationResult validation = validateRequest(request);
            if (!validation.isValid) {
                return new APIGatewayResponse(false, validation.errorMessage, null, requestId);
            }
            
            // Check rate limits
            if (!checkRateLimit(request.systemName, request.userId)) {
                return new APIGatewayResponse(false, 'Rate limit exceeded', null, requestId);
            }
            
            // Get endpoint configuration
            APIEndpointConfig config = ENDPOINT_CONFIGS.get(request.systemName.toUpperCase());
            if (config == null) {
                return new APIGatewayResponse(false, 'Unknown system: ' + request.systemName, null, requestId);
            }
            
            // Build HTTP request
            HttpRequest httpReq = buildHttpRequest(request, config);
            
            // Execute request with retry logic
            APIGatewayResponse response = executeWithRetry(httpReq, config, requestId);
            
            // Log request/response
            logAPICall(request, response, requestId);
            
            // Update rate limit counters
            updateRateLimit(request.systemName, request.userId);
            
            return response;
            
        } catch (Exception e) {
            logError('API Gateway error for request ' + requestId + ': ' + e.getMessage());
            return new APIGatewayResponse(false, 'Internal gateway error', null, requestId);
        }
    }
    
    // Rate Limiting Implementation
    private static Boolean checkRateLimit(String systemName, String userId) {
        APIEndpointConfig config = ENDPOINT_CONFIGS.get(systemName.toUpperCase());
        if (config == null) return false;
        
        String cacheKey = 'RATE_LIMIT_' + systemName + '_' + userId;
        RateLimitData rateLimitData = (RateLimitData)Cache.Org.get(cacheKey);
        
        if (rateLimitData == null) {
            rateLimitData = new RateLimitData();
            rateLimitData.requestCount = 0;
            rateLimitData.windowStart = System.now();
        }
        
        // Check if we're in a new time window
        if (System.now().getTime() - rateLimitData.windowStart.getTime() > (config.rateLimitWindow * 1000)) {
            rateLimitData.requestCount = 0;
            rateLimitData.windowStart = System.now();
        }
        
        // Check if limit exceeded
        if (rateLimitData.requestCount >= config.rateLimitRequests) {
            return false;
        }
        
        return true;
    }
    
    private static void updateRateLimit(String systemName, String userId) {
        APIEndpointConfig config = ENDPOINT_CONFIGS.get(systemName.toUpperCase());
        String cacheKey = 'RATE_LIMIT_' + systemName + '_' + userId;
        
        RateLimitData rateLimitData = (RateLimitData)Cache.Org.get(cacheKey);
        if (rateLimitData == null) {
            rateLimitData = new RateLimitData();
            rateLimitData.requestCount = 0;
            rateLimitData.windowStart = System.now();
        }
        
        rateLimitData.requestCount++;
        Cache.Org.put(cacheKey, rateLimitData, config.rateLimitWindow);
    }
    
    // HTTP Request Building
    private static HttpRequest buildHttpRequest(APIGatewayRequest request, APIEndpointConfig config) {
        HttpRequest httpReq = new HttpRequest();
        
        // Set endpoint
        String endpoint = config.baseUrl + request.endpoint;
        if (String.isNotBlank(request.queryParams)) {
            endpoint += '?' + request.queryParams;
        }
        httpReq.setEndpoint(endpoint);
        
        // Set method
        httpReq.setMethod(request.method);
        
        // Set headers
        httpReq.setHeader('Content-Type', 'application/json');
        httpReq.setHeader('Accept', 'application/json');
        httpReq.setHeader('User-Agent', 'Salesforce-API-Gateway/1.0');
        httpReq.setHeader('X-Request-ID', request.requestId);
        
        // Add authentication
        String authHeader = getAuthenticationHeader(config.credentialsName);
        if (String.isNotBlank(authHeader)) {
            httpReq.setHeader('Authorization', authHeader);
        }
        
        // Add custom headers
        if (request.customHeaders != null) {
            for (String headerName : request.customHeaders.keySet()) {
                httpReq.setHeader(headerName, request.customHeaders.get(headerName));
            }
        }
        
        // Set body
        if (String.isNotBlank(request.body)) {
            httpReq.setBody(request.body);
        }
        
        // Set timeout
        httpReq.setTimeout(30000);
        
        return httpReq;
    }
    
    // Retry Logic Implementation
    private static APIGatewayResponse executeWithRetry(HttpRequest httpReq, APIEndpointConfig config, String requestId) {
        Integer maxRetries = 3;
        Integer retryDelay = 1000; // 1 second
        
        for (Integer attempt = 1; attempt <= maxRetries; attempt++) {
            try {
                Http http = new Http();
                HttpResponse httpRes = http.send(httpReq);
                
                // Check if retry is needed
                if (shouldRetry(httpRes.getStatusCode()) && attempt < maxRetries) {
                    logRetry(requestId, attempt, httpRes.getStatusCode());
                    
                    // Exponential backoff
                    Integer delay = retryDelay * (Integer)Math.pow(2, attempt - 1);
                    // Note: Actual delay implementation would require async processing
                    
                    continue;
                }
                
                // Process response
                return processHttpResponse(httpRes, requestId);
                
            } catch (Exception e) {
                if (attempt == maxRetries) {
                    throw e;
                }
                logRetry(requestId, attempt, null);
            }
        }
        
        return new APIGatewayResponse(false, 'Max retries exceeded', null, requestId);
    }
    
    private static Boolean shouldRetry(Integer statusCode) {
        // Retry on server errors and rate limiting
        return statusCode >= 500 || statusCode == 429 || statusCode == 408;
    }
    
    private static APIGatewayResponse processHttpResponse(HttpResponse httpRes, String requestId) {
        Boolean success = httpRes.getStatusCode() >= 200 && httpRes.getStatusCode() < 300;
        String message = success ? 'Request successful' : 'Request failed with status: ' + httpRes.getStatusCode();
        
        Object responseData = null;
        try {
            if (String.isNotBlank(httpRes.getBody())) {
                responseData = JSON.deserializeUntyped(httpRes.getBody());
            }
        } catch (Exception e) {
            // Response is not JSON, return as string
            responseData = httpRes.getBody();
        }
        
        APIGatewayResponse response = new APIGatewayResponse(success, message, responseData, requestId);
        response.statusCode = httpRes.getStatusCode();
        response.headers = new Map<String, String>();
        
        // Extract response headers
        for (String headerName : httpRes.getHeaderKeys()) {
            response.headers.put(headerName, httpRes.getHeader(headerName));
        }
        
        return response;
    }
    
    // Authentication Management
    private static String getAuthenticationHeader(String credentialsName) {
        API_Credentials__c credentials = API_Credentials__c.getInstance(credentialsName);
        if (credentials == null) {
            return null;
        }
        
        switch on credentials.Auth_Type__c {
            when 'Bearer' {
                return 'Bearer ' + credentials.Access_Token__c;
            }
            when 'Basic' {
                String auth = credentials.Username__c + ':' + credentials.Password__c;
                return 'Basic ' + EncodingUtil.base64Encode(Blob.valueOf(auth));
            }
            when 'API_Key' {
                return credentials.API_Key_Header__c + ' ' + credentials.API_Key__c;
            }
            when else {
                return null;
            }
        }
    }
    
    // Logging and Monitoring
    private static void logAPICall(APIGatewayRequest request, APIGatewayResponse response, String requestId) {
        API_Call_Log__c log = new API_Call_Log__c(
            Request_ID__c = requestId,
            System_Name__c = request.systemName,
            User_ID__c = request.userId,
            Method__c = request.method,
            Endpoint__c = request.endpoint,
            Request_Body__c = truncateString(request.body, 32000),
            Response_Status_Code__c = response.statusCode,
            Response_Body__c = truncateString(JSON.serialize(response.data), 32000),
            Success__c = response.success,
            Response_Time_MS__c = response.responseTime,
            Created_Date__c = System.now()
        );
        
        // Insert asynchronously to avoid impacting performance
        insertLogAsync(log);
    }
    
    @future
    private static void insertLogAsync(API_Call_Log__c log) {
        try {
            insert log;
        } catch (Exception e) {
            System.debug('Failed to insert API call log: ' + e.getMessage());
        }
    }
    
    // Utility Methods
    private static String generateRequestId() {
        return 'REQ_' + System.currentTimeMillis() + '_' + Math.round(Math.random() * 10000);
    }
    
    private static String truncateString(String str, Integer maxLength) {
        if (String.isBlank(str) || str.length() <= maxLength) {
            return str;
        }
        return str.substring(0, maxLength) + '...';
    }
    
    // Data Classes
    public class APIGatewayRequest {
        public String systemName;
        public String userId;
        public String method;
        public String endpoint;
        public String queryParams;
        public String body;
        public Map<String, String> customHeaders;
        public String requestId;
        
        public APIGatewayRequest(String systemName, String userId, String method, String endpoint) {
            this.systemName = systemName;
            this.userId = userId;
            this.method = method;
            this.endpoint = endpoint;
            this.requestId = generateRequestId();
        }
    }
    
    public class APIGatewayResponse {
        public Boolean success;
        public String message;
        public Object data;
        public String requestId;
        public Integer statusCode;
        public Map<String, String> headers;
        public Long responseTime;
        
        public APIGatewayResponse(Boolean success, String message, Object data, String requestId) {
            this.success = success;
            this.message = message;
            this.data = data;
            this.requestId = requestId;
        }
    }
    
    private class APIEndpointConfig {
        public String baseUrl;
        public String credentialsName;
        public Integer rateLimitRequests;
        public Integer rateLimitWindow; // seconds
        
        public APIEndpointConfig(String baseUrl, String credentialsName, Integer rateLimitRequests, Integer rateLimitWindow) {
            this.baseUrl = baseUrl;
            this.credentialsName = credentialsName;
            this.rateLimitRequests = rateLimitRequests;
            this.rateLimitWindow = rateLimitWindow;
        }
    }
    
    private class RateLimitData {
        public Integer requestCount;
        public DateTime windowStart;
    }
    
    private class ValidationResult {
        public Boolean isValid;
        public String errorMessage;
        
        public ValidationResult(Boolean isValid, String errorMessage) {
            this.isValid = isValid;
            this.errorMessage = errorMessage;
        }
    }
}`,
        language: 'apex',
        explanation: 'This API Gateway service provides centralized management of external API integrations with enterprise features including rate limiting, retry logic, authentication management, comprehensive logging, and monitoring. The service abstracts the complexity of different external systems while providing consistent error handling and security controls.'
      }
    ],
    limitations: [
      'Maximum 100 HTTP callouts per transaction in synchronous context',
      'HTTP callouts have a 120-second timeout limit',
      'Request and response size limits (6MB for synchronous, 12MB for asynchronous)',
      'Cannot make callouts from triggers without using @future or queueable',
      'Limited to specific HTTP methods and headers'
    ],
    architecturalConsiderations: [
      'Design for idempotency to handle duplicate requests and retries safely',
      'Implement proper authentication and token management strategies',
      'Use asynchronous processing for non-critical integrations to improve performance',
      'Monitor API usage and implement rate limiting to prevent system overload',
      'Plan for error handling, logging, and alerting in production environments'
    ]
  },
  {
    id: 'middleware-esb',
    title: 'Middleware & ESB Integration',
    section: 'integration',
    content: `
      <p>Enterprise Service Bus (ESB) and middleware patterns are essential for managing complex integration landscapes in large organizations. These patterns provide centralized integration management, protocol transformation, message routing, and service orchestration capabilities.</p>
      
      <h3>ESB Architecture Patterns</h3>
      <p>Modern ESB implementations support various architectural patterns:</p>
      <ul>
        <li><strong>Hub-and-Spoke:</strong> Centralized integration hub managing all system connections</li>
        <li><strong>Message Bus:</strong> Distributed messaging infrastructure for loose coupling</li>
        <li><strong>Service Mesh:</strong> Infrastructure layer for service-to-service communication</li>
        <li><strong>Event-Driven Architecture:</strong> Asynchronous, event-based system interactions</li>
      </ul>
      
      <h3>Middleware Capabilities</h3>
      <p>Enterprise middleware provides critical integration services:</p>
      <ul>
        <li><strong>Protocol Translation:</strong> Converting between different communication protocols</li>
        <li><strong>Data Transformation:</strong> Mapping and converting data formats between systems</li>
        <li><strong>Message Routing:</strong> Intelligent routing based on content and business rules</li>
        <li><strong>Transaction Management:</strong> Ensuring data consistency across multiple systems</li>
        <li><strong>Security:</strong> Authentication, authorization, and encryption services</li>
      </ul>
      
      <h3>Salesforce Integration Patterns</h3>
      <p>Salesforce integrates with middleware through several patterns:</p>
      <ul>
        <li><strong>Platform Events:</strong> Publishing and subscribing to real-time events</li>
        <li><strong>Streaming API:</strong> Real-time data synchronization</li>
        <li><strong>Outbound Messages:</strong> SOAP-based notifications to external systems</li>
        <li><strong>REST/SOAP APIs:</strong> Standard web service interfaces</li>
        <li><strong>Bulk API:</strong> High-volume data exchange</li>
      </ul>
    `,
    keyPoints: [
      'Use Platform Events for real-time, event-driven integration patterns',
      'Implement proper message transformation and routing logic',
      'Design for high availability and fault tolerance in middleware layers',
      'Monitor message flow and performance across integration points',
      'Ensure proper security and compliance across all integration touchpoints'
    ],
    examples: [
      {
        title: 'Platform Events Integration Hub',
        description: 'Event-driven integration using Salesforce Platform Events as ESB backbone',
        code: `// Platform Event Publisher Service
public class IntegrationEventPublisher {
    
    // Publish Customer Change Event
    public static void publishCustomerChangeEvent(List<Account> accounts, String changeType) {
        List<Customer_Change_Event__e> events = new List<Customer_Change_Event__e>();
        
        for (Account acc : accounts) {
            Customer_Change_Event__e event = new Customer_Change_Event__e(
                Customer_ID__c = acc.Id,
                External_Customer_ID__c = acc.External_Customer_ID__c,
                Customer_Name__c = acc.Name,
                Change_Type__c = changeType,
                Industry__c = acc.Industry,
                Annual_Revenue__c = acc.AnnualRevenue,
                Billing_Country__c = acc.BillingCountry,
                Event_Source__c = 'Salesforce',
                Event_Timestamp__c = System.now(),
                Correlation_ID__c = generateCorrelationId(),
                Event_Version__c = '1.0'
            );
            
            // Add change-specific data
            if (changeType == 'UPDATE') {
                event.Previous_Values__c = JSON.serialize(getPreviousValues(acc));
            }
            
            events.add(event);
        }
        
        // Publish events
        List<Database.SaveResult> results = EventBus.publish(events);
        
        // Handle publish failures
        for (Integer i = 0; i < results.size(); i++) {
            if (!results[i].isSuccess()) {
                logPublishError(events[i], results[i].getErrors());
            }
        }
    }
    
    // Publish Order Processing Event
    public static void publishOrderProcessingEvent(Order order, String status, String details) {
        Order_Processing_Event__e event = new Order_Processing_Event__e(
            Order_ID__c = order.Id,
            Order_Number__c = order.OrderNumber,
            Account_ID__c = order.AccountId,
            Status__c = status,
            Processing_Details__c = details,
            Total_Amount__c = order.TotalAmount,
            Event_Source__c = 'Salesforce',
            Event_Timestamp__c = System.now(),
            Correlation_ID__c = generateCorrelationId()
        );
        
        Database.SaveResult result = EventBus.publish(event);
        if (!result.isSuccess()) {
            logPublishError(event, result.getErrors());
        }
    }
    
    // Publish Integration Error Event
    public static void publishIntegrationErrorEvent(String systemName, String operation, 
                                                   String errorMessage, String recordId) {
        Integration_Error_Event__e event = new Integration_Error_Event__e(
            System_Name__c = systemName,
            Operation__c = operation,
            Error_Message__c = errorMessage,
            Record_ID__c = recordId,
            Error_Timestamp__c = System.now(),
            Severity__c = 'High',
            Event_Source__c = 'Salesforce',
            Correlation_ID__c = generateCorrelationId()
        );
        
        EventBus.publish(event);
    }
    
    private static String generateCorrelationId() {
        return 'CORR_' + System.currentTimeMillis() + '_' + Math.round(Math.random() * 10000);
    }
    
    private static Map<String, Object> getPreviousValues(Account acc) {
        // Implementation would track previous values
        return new Map<String, Object>();
    }
    
    private static void logPublishError(SObject event, List<Database.Error> errors) {
        String errorMessage = '';
        for (Database.Error error : errors) {
            errorMessage += error.getMessage() + '; ';
        }
        
        System.debug('Failed to publish event: ' + event + ', Errors: ' + errorMessage);
        
        // Create error log record
        Integration_Error_Log__c errorLog = new Integration_Error_Log__c(
            Event_Type__c = String.valueOf(event.getSObjectType()),
            Error_Message__c = errorMessage,
            Event_Data__c = JSON.serialize(event),
            Created_Date__c = System.now()
        );
        
        insert errorLog;
    }
}

// Platform Event Subscriber (Trigger)
trigger CustomerChangeEventTrigger on Customer_Change_Event__e (after insert) {
    CustomerChangeEventHandler.handleCustomerChanges(Trigger.new);
}

// Event Handler for Processing
public class CustomerChangeEventHandler {
    
    public static void handleCustomerChanges(List<Customer_Change_Event__e> events) {
        List<CustomerChangeMessage> messages = new List<CustomerChangeMessage>();
        
        for (Customer_Change_Event__e event : events) {
            CustomerChangeMessage message = new CustomerChangeMessage();
            message.customerId = event.Customer_ID__c;
            message.externalCustomerId = event.External_Customer_ID__c;
            message.customerName = event.Customer_Name__c;
            message.changeType = event.Change_Type__c;
            message.industry = event.Industry__c;
            message.annualRevenue = event.Annual_Revenue__c;
            message.billingCountry = event.Billing_Country__c;
            message.eventSource = event.Event_Source__c;
            message.eventTimestamp = event.Event_Timestamp__c;
            message.correlationId = event.Correlation_ID__c;
            
            messages.add(message);
        }
        
        // Route messages to appropriate handlers
        routeCustomerChangeMessages(messages);
    }
    
    private static void routeCustomerChangeMessages(List<CustomerChangeMessage> messages) {
        // Group messages by routing criteria
        Map<String, List<CustomerChangeMessage>> routingMap = new Map<String, List<CustomerChangeMessage>>();
        
        for (CustomerChangeMessage message : messages) {
            String routingKey = determineRoutingKey(message);
            
            if (!routingMap.containsKey(routingKey)) {
                routingMap.put(routingKey, new List<CustomerChangeMessage>());
            }
            routingMap.get(routingKey).add(message);
        }
        
        // Process each routing group
        for (String routingKey : routingMap.keySet()) {
            List<CustomerChangeMessage> routedMessages = routingMap.get(routingKey);
            
            switch on routingKey {
                when 'ERP_SYNC' {
                    ERPSyncHandler.processCustomerChanges(routedMessages);
                }
                when 'MARKETING_SYNC' {
                    MarketingSyncHandler.processCustomerChanges(routedMessages);
                }
                when 'ANALYTICS_SYNC' {
                    AnalyticsSyncHandler.processCustomerChanges(routedMessages);
                }
                when 'NOTIFICATION' {
                    NotificationHandler.processCustomerChanges(routedMessages);
                }
            }
        }
    }
    
    private static String determineRoutingKey(CustomerChangeMessage message) {
        // Business rules for message routing
        if (message.annualRevenue != null && message.annualRevenue > 1000000) {
            return 'ERP_SYNC';
        } else if (message.changeType == 'CREATE') {
            return 'MARKETING_SYNC';
        } else if (message.industry == 'Technology') {
            return 'ANALYTICS_SYNC';
        } else {
            return 'NOTIFICATION';
        }
    }
    
    public class CustomerChangeMessage {
        public String customerId;
        public String externalCustomerId;
        public String customerName;
        public String changeType;
        public String industry;
        public Decimal annualRevenue;
        public String billingCountry;
        public String eventSource;
        public DateTime eventTimestamp;
        public String correlationId;
    }
}

// Message Transformation Service
public class MessageTransformationService {
    
    // Transform Salesforce Account to ERP Customer Format
    public static ERPCustomerMessage transformToERPFormat(CustomerChangeMessage sfMessage) {
        ERPCustomerMessage erpMessage = new ERPCustomerMessage();
        
        // Direct field mapping
        erpMessage.customerId = sfMessage.externalCustomerId;
        erpMessage.customerName = sfMessage.customerName;
        erpMessage.industry = mapIndustryToERPCode(sfMessage.industry);
        erpMessage.annualRevenue = sfMessage.annualRevenue;
        erpMessage.country = mapCountryToERPCode(sfMessage.billingCountry);
        
        // Derived fields
        erpMessage.customerType = determineCustomerType(sfMessage.annualRevenue);
        erpMessage.riskCategory = determineRiskCategory(sfMessage.industry, sfMessage.billingCountry);
        
        // Metadata
        erpMessage.sourceSystem = 'SALESFORCE';
        erpMessage.transformationTimestamp = System.now();
        erpMessage.correlationId = sfMessage.correlationId;
        erpMessage.messageVersion = '2.1';
        
        return erpMessage;
    }
    
    // Transform to Marketing Platform Format
    public static MarketingMessage transformToMarketingFormat(CustomerChangeMessage sfMessage) {
        MarketingMessage marketingMessage = new MarketingMessage();
        
        marketingMessage.contactId = sfMessage.customerId;
        marketingMessage.companyName = sfMessage.customerName;
        marketingMessage.segment = determineMarketingSegment(sfMessage.industry, sfMessage.annualRevenue);
        marketingMessage.region = mapCountryToRegion(sfMessage.billingCountry);
        marketingMessage.eventType = mapChangeTypeToMarketingEvent(sfMessage.changeType);
        
        // Marketing-specific enrichment
        marketingMessage.campaignEligibility = determineCampaignEligibility(sfMessage);
        marketingMessage.leadScore = calculateLeadScore(sfMessage);
        
        return marketingMessage;
    }
    
    // Utility mapping methods
    private static String mapIndustryToERPCode(String industry) {
        Map<String, String> industryMapping = new Map<String, String>{
            'Technology' => 'TECH',
            'Healthcare' => 'HLTH',
            'Financial Services' => 'FINC',
            'Manufacturing' => 'MANF',
            'Retail' => 'RETL'
        };
        
        return industryMapping.get(industry) != null ? industryMapping.get(industry) : 'OTHR';
    }
    
    private static String mapCountryToERPCode(String country) {
        Map<String, String> countryMapping = new Map<String, String>{
            'United States' => 'US',
            'Canada' => 'CA',
            'United Kingdom' => 'GB',
            'Germany' => 'DE',
            'France' => 'FR'
        };
        
        return countryMapping.get(country) != null ? countryMapping.get(country) : 'XX';
    }
    
    private static String determineCustomerType(Decimal annualRevenue) {
        if (annualRevenue == null) return 'UNKNOWN';
        if (annualRevenue > 10000000) return 'ENTERPRISE';
        if (annualRevenue > 1000000) return 'COMMERCIAL';
        return 'SMB';
    }
    
    private static String determineRiskCategory(String industry, String country) {
        // Complex business logic for risk assessment
        if (industry == 'Financial Services') return 'HIGH';
        if (country == 'United States') return 'LOW';
        return 'MEDIUM';
    }
    
    private static String determineMarketingSegment(String industry, Decimal annualRevenue) {
        if (annualRevenue != null && annualRevenue > 5000000) {
            return 'ENTERPRISE_' + industry?.toUpperCase();
        }
        return 'SMB_' + industry?.toUpperCase();
    }
    
    private static String mapCountryToRegion(String country) {
        Map<String, String> regionMapping = new Map<String, String>{
            'United States' => 'AMERICAS',
            'Canada' => 'AMERICAS',
            'United Kingdom' => 'EMEA',
            'Germany' => 'EMEA',
            'France' => 'EMEA',
            'Japan' => 'APAC',
            'Australia' => 'APAC'
        };
        
        return regionMapping.get(country) != null ? regionMapping.get(country) : 'GLOBAL';
    }
    
    // Message format classes
    public class ERPCustomerMessage {
        public String customerId;
        public String customerName;
        public String industry;
        public Decimal annualRevenue;
        public String country;
        public String customerType;
        public String riskCategory;
        public String sourceSystem;
        public DateTime transformationTimestamp;
        public String correlationId;
        public String messageVersion;
    }
    
    public class MarketingMessage {
        public String contactId;
        public String companyName;
        public String segment;
        public String region;
        public String eventType;
        public List<String> campaignEligibility;
        public Integer leadScore;
    }
}`,
        language: 'apex',
        explanation: 'This comprehensive Platform Events integration demonstrates how to use Salesforce as an ESB backbone for enterprise integration. The solution includes event publishing, intelligent message routing, data transformation, and error handling. It shows how to build scalable, event-driven architectures that can handle complex integration scenarios with multiple downstream systems.'
      },
      {
        title: 'Enterprise Message Queue Integration',
        description: 'Asynchronous message processing with guaranteed delivery and error handling',
        code: `// Message Queue Service for Enterprise Integration
public class MessageQueueService {
    
    private static final String QUEUE_ENDPOINT = 'https://messagequeue.company.com/api/v1';
    private static final Integer MAX_RETRY_ATTEMPTS = 3;
    private static final Integer RETRY_DELAY_MS = 5000;
    
    // Enqueue message with guaranteed delivery
    public static void enqueueMessage(MessageQueueRequest request) {
        try {
            // Validate message
            validateMessage(request);
            
            // Create queue message record for tracking
            Message_Queue_Item__c queueItem = createQueueItem(request);
            insert queueItem;
            
            // Send to external queue
            sendToExternalQueue(queueItem);
            
        } catch (Exception e) {
            logError('Failed to enqueue message: ' + e.getMessage(), request);
            throw new MessageQueueException('Message enqueue failed: ' + e.getMessage());
        }
    }
    
    // Batch message processing
    public static void enqueueBatchMessages(List<MessageQueueRequest> requests) {
        List<Message_Queue_Item__c> queueItems = new List<Message_Queue_Item__c>();
        
        for (MessageQueueRequest request : requests) {
            try {
                validateMessage(request);
                queueItems.add(createQueueItem(request));
            } catch (Exception e) {
                logError('Invalid message in batch: ' + e.getMessage(), request);
            }
        }
        
        if (!queueItems.isEmpty()) {
            insert queueItems;
            
            // Process in chunks to avoid governor limits
            Integer chunkSize = 10;
            for (Integer i = 0; i < queueItems.size(); i += chunkSize) {
                Integer endIndex = Math.min(i + chunkSize, queueItems.size());
                List<Message_Queue_Item__c> chunk = queueItems.subList(i, endIndex);
                processBatchChunk(chunk);
            }
        }
    }
    
    @future(callout=true)
    private static void processBatchChunk(List<Message_Queue_Item__c> queueItems) {
        for (Message_Queue_Item__c item : queueItems) {
            sendToExternalQueue(item);
        }
    }
    
    // Send message to external queue system
    private static void sendToExternalQueue(Message_Queue_Item__c queueItem) {
        HttpRequest req = new HttpRequest();
        req.setEndpoint(QUEUE_ENDPOINT + '/messages');
        req.setMethod('POST');
        req.setHeader('Content-Type', 'application/json');
        req.setHeader('Authorization', 'Bearer ' + getQueueAccessToken());
        req.setTimeout(30000);
        
        // Build queue message payload
        QueueMessagePayload payload = new QueueMessagePayload();
        payload.messageId = queueItem.Message_ID__c;
        payload.queueName = queueItem.Queue_Name__c;
        payload.messageType = queueItem.Message_Type__c;
        payload.priority = queueItem.Priority__c;
        payload.payload = queueItem.Message_Payload__c;
        payload.correlationId = queueItem.Correlation_ID__c;
        payload.timeToLive = queueItem.TTL_Seconds__c;
        payload.retryPolicy = buildRetryPolicy(queueItem);
        
        req.setBody(JSON.serialize(payload));
        
        try {
            Http http = new Http();
            HttpResponse res = http.send(req);
            
            handleQueueResponse(queueItem, res);
            
        } catch (Exception e) {
            handleQueueError(queueItem, e.getMessage());
        }
    }
    
    // Handle queue response
    private static void handleQueueResponse(Message_Queue_Item__c queueItem, HttpResponse res) {
        if (res.getStatusCode() >= 200 && res.getStatusCode() < 300) {
            // Success
            queueItem.Status__c = 'Sent';
            queueItem.Sent_Timestamp__c = System.now();
            queueItem.Response_Code__c = res.getStatusCode();
            queueItem.Response_Body__c = res.getBody();
            
        } else {
            // Error
            queueItem.Status__c = 'Failed';
            queueItem.Error_Message__c = 'HTTP ' + res.getStatusCode() + ': ' + res.getBody();
            queueItem.Response_Code__c = res.getStatusCode();
            queueItem.Failed_Attempts__c = (queueItem.Failed_Attempts__c != null ? queueItem.Failed_Attempts__c : 0) + 1;
            
            // Schedule retry if within limits
            if (queueItem.Failed_Attempts__c < MAX_RETRY_ATTEMPTS) {
                scheduleRetry(queueItem);
            } else {
                queueItem.Status__c = 'Dead Letter';
                createDeadLetterRecord(queueItem);
            }
        }
        
        update queueItem;
    }
    
    // Handle queue errors
    private static void handleQueueError(Message_Queue_Item__c queueItem, String errorMessage) {
        queueItem.Status__c = 'Failed';
        queueItem.Error_Message__c = errorMessage;
        queueItem.Failed_Attempts__c = (queueItem.Failed_Attempts__c != null ? queueItem.Failed_Attempts__c : 0) + 1;
        
        if (queueItem.Failed_Attempts__c < MAX_RETRY_ATTEMPTS) {
            scheduleRetry(queueItem);
        } else {
            queueItem.Status__c = 'Dead Letter';
            createDeadLetterRecord(queueItem);
        }
        
        update queueItem;
    }
    
    // Schedule message retry
    private static void scheduleRetry(Message_Queue_Item__c queueItem) {
        // Calculate retry delay with exponential backoff
        Integer delaySeconds = RETRY_DELAY_MS * (Integer)Math.pow(2, queueItem.Failed_Attempts__c) / 1000;
        DateTime retryTime = System.now().addSeconds(delaySeconds);
        
        queueItem.Status__c = 'Retry Scheduled';
        queueItem.Retry_Timestamp__c = retryTime;
        
        // In a real implementation, you would schedule a job to retry at the specified time
        // For this example, we'll use a batch job that runs periodically
    }
    
    // Create dead letter record for failed messages
    private static void createDeadLetterRecord(Message_Queue_Item__c queueItem) {
        Dead_Letter_Queue__c deadLetter = new Dead_Letter_Queue__c(
            Original_Message_ID__c = queueItem.Message_ID__c,
            Queue_Name__c = queueItem.Queue_Name__c,
            Message_Type__c = queueItem.Message_Type__c,
            Message_Payload__c = queueItem.Message_Payload__c,
            Correlation_ID__c = queueItem.Correlation_ID__c,
            Failed_Attempts__c = queueItem.Failed_Attempts__c,
            Last_Error_Message__c = queueItem.Error_Message__c,
            Created_Timestamp__c = queueItem.Created_Timestamp__c,
            Dead_Letter_Timestamp__c = System.now(),
            Requires_Manual_Review__c = true
        );
        
        insert deadLetter;
        
        // Send notification to administrators
        notifyAdministrators(deadLetter);
    }
    
    // Message consumption from external queue
    @RestResource(urlMapping='/messagequeue/webhook/*')
    global class MessageQueueWebhook {
        
        @HttpPost
        global static WebhookResponse receiveMessage() {
            RestRequest req = RestContext.request;
            RestResponse res = RestContext.response;
            
            try {
                // Parse incoming message
                IncomingQueueMessage message = (IncomingQueueMessage)JSON.deserialize(
                    req.requestBody.toString(), IncomingQueueMessage.class);
                
                // Validate message
                if (String.isBlank(message.messageId) || String.isBlank(message.messageType)) {
                    res.statusCode = 400;
                    return new WebhookResponse(false, 'Invalid message format');
                }
                
                // Process message based on type
                Boolean processed = processIncomingMessage(message);
                
                if (processed) {
                    res.statusCode = 200;
                    return new WebhookResponse(true, 'Message processed successfully');
                } else {
                    res.statusCode = 500;
                    return new WebhookResponse(false, 'Message processing failed');
                }
                
            } catch (Exception e) {
                res.statusCode = 500;
                logError('Webhook processing failed: ' + e.getMessage(), null);
                return new WebhookResponse(false, 'Internal processing error');
            }
        }
    }
    
    // Process incoming messages from queue
    private static Boolean processIncomingMessage(IncomingQueueMessage message) {
        try {
            // Log incoming message
            Incoming_Message_Log__c messageLog = new Incoming_Message_Log__c(
                Message_ID__c = message.messageId,
                Message_Type__c = message.messageType,
                Source_Queue__c = message.queueName,
                Correlation_ID__c = message.correlationId,
                Message_Payload__c = message.payload,
                Received_Timestamp__c = System.now(),
                Processing_Status__c = 'Processing'
            );
            insert messageLog;
            
            // Route message to appropriate handler
            Boolean success = routeMessage(message);
            
            // Update processing status
            messageLog.Processing_Status__c = success ? 'Completed' : 'Failed';
            messageLog.Processed_Timestamp__c = System.now();
            update messageLog;
            
            return success;
            
        } catch (Exception e) {
            logError('Failed to process incoming message: ' + e.getMessage(), null);
            return false;
        }
    }
    
    // Route messages to appropriate handlers
    private static Boolean routeMessage(IncomingQueueMessage message) {
        switch on message.messageType {
            when 'CUSTOMER_UPDATE' {
                return CustomerUpdateHandler.processMessage(message);
            }
            when 'ORDER_STATUS' {
                return OrderStatusHandler.processMessage(message);
            }
            when 'INVENTORY_UPDATE' {
                return InventoryUpdateHandler.processMessage(message);
            }
            when 'NOTIFICATION' {
                return NotificationHandler.processMessage(message);
            }
            when else {
                logError('Unknown message type: ' + message.messageType, null);
                return false;
            }
        }
    }
    
    // Utility methods
    private static Message_Queue_Item__c createQueueItem(MessageQueueRequest request) {
        return new Message_Queue_Item__c(
            Message_ID__c = generateMessageId(),
            Queue_Name__c = request.queueName,
            Message_Type__c = request.messageType,
            Priority__c = request.priority != null ? request.priority : 'Normal',
            Message_Payload__c = request.payload,
            Correlation_ID__c = request.correlationId,
            TTL_Seconds__c = request.timeToLive,
            Status__c = 'Pending',
            Created_Timestamp__c = System.now(),
            Failed_Attempts__c = 0
        );
    }
    
    private static String generateMessageId() {
        return 'MSG_' + System.currentTimeMillis() + '_' + Math.round(Math.random() * 10000);
    }
    
    private static String getQueueAccessToken() {
        // Implementation would retrieve and cache access token
        return 'sample_access_token';
    }
    
    private static Map<String, Object> buildRetryPolicy(Message_Queue_Item__c queueItem) {
        return new Map<String, Object>{
            'maxRetries' => MAX_RETRY_ATTEMPTS,
            'retryDelay' => RETRY_DELAY_MS,
            'backoffMultiplier' => 2
        };
    }
    
    // Data classes
    public class MessageQueueRequest {
        public String queueName;
        public String messageType;
        public String priority;
        public String payload;
        public String correlationId;
        public Integer timeToLive;
    }
    
    public class QueueMessagePayload {
        public String messageId;
        public String queueName;
        public String messageType;
        public String priority;
        public String payload;
        public String correlationId;
        public Integer timeToLive;
        public Map<String, Object> retryPolicy;
    }
    
    public class IncomingQueueMessage {
        public String messageId;
        public String messageType;
        public String queueName;
        public String correlationId;
        public String payload;
        public DateTime timestamp;
    }
    
    global class WebhookResponse {
        global Boolean success;
        global String message;
        
        global WebhookResponse(Boolean success, String message) {
            this.success = success;
            this.message = message;
        }
    }
    
    public class MessageQueueException extends Exception {}
}`,
        language: 'apex',
        explanation: 'This enterprise message queue service provides guaranteed message delivery with retry logic, dead letter queue handling, and comprehensive error management. The solution demonstrates how to build reliable asynchronous integration patterns that can handle high-volume message processing while maintaining data integrity and providing proper monitoring and alerting capabilities.'
      }
    ],
    limitations: [
      'Platform Events have delivery guarantees but may experience delays during high volume',
      'Maximum Platform Event message size is 1MB',
      'Outbound Messages are SOAP-only and have retry limitations',
      'Streaming API requires persistent connections and proper client implementation',
      'Complex message routing may require external middleware for optimal performance'
    ],
    architecturalConsiderations: [
      'Design for eventual consistency in distributed, event-driven architectures',
      'Implement proper message ordering and deduplication strategies',
      'Plan for message transformation and protocol translation requirements',
      'Consider message retention and replay capabilities for audit and recovery',
      'Monitor message flow and performance across all integration points'
    ]
  },

  // AURA COMPONENTS (Legacy)
  {
    id: 'aura-architecture',
    title: 'Aura Component Architecture',
    section: 'aura',
    content: `
      <p>Aura Components represent Salesforce's first-generation Lightning framework, providing a component-based architecture for building dynamic web applications. While Aura is now in maintenance mode with Lightning Web Components (LWC) being the preferred approach, understanding Aura remains important for maintaining existing applications and planning migration strategies.</p>
      
      <h3>Aura Framework Architecture</h3>
      <p>Aura follows a Model-View-Controller (MVC) pattern with several key components:</p>
      <ul>
        <li><strong>Component (.cmp):</strong> The view layer containing markup and component structure</li>
        <li><strong>Controller (.js):</strong> Client-side JavaScript handling user interactions</li>
        <li><strong>Helper (.js):</strong> Reusable JavaScript functions shared across controller methods</li>
        <li><strong>Style (.css):</strong> Component-specific styling and appearance</li>
        <li><strong>Documentation (.auradoc):</strong> Component documentation and usage examples</li>
        <li><strong>Renderer (.js):</strong> Custom rendering logic for complex UI scenarios</li>
        <li><strong>SVG (.svg):</strong> Custom icons for the component</li>
      </ul>
      
      <h3>Component Lifecycle</h3>
      <p>Aura components follow a specific lifecycle with events:</p>
      <ul>
        <li><strong>init:</strong> Component initialization after construction</li>
        <li><strong>render:</strong> Component rendering to the DOM</li>
        <li><strong>afterRender:</strong> Post-rendering operations</li>
        <li><strong>rerender:</strong> Component re-rendering after changes</li>
        <li><strong>unrender:</strong> Component cleanup before destruction</li>
        <li><strong>destroy:</strong> Component destruction and memory cleanup</li>
      </ul>
      
      <h3>Migration Considerations</h3>
      <p>Organizations with existing Aura components should plan for migration:</p>
      <ul>
        <li><strong>Assessment:</strong> Inventory and categorize existing Aura components</li>
        <li><strong>Prioritization:</strong> Identify components for migration vs. maintenance</li>
        <li><strong>Coexistence:</strong> Plan for Aura and LWC components working together</li>
        <li><strong>Training:</strong> Prepare development teams for LWC development</li>
      </ul>
    `,
    keyPoints: [
      'Aura is in maintenance mode; new development should use Lightning Web Components',
      'Existing Aura components can coexist with LWC in the same application',
      'Focus on maintaining critical Aura components while planning LWC migration',
      'Use Aura-to-LWC migration tools and best practices for systematic conversion',
      'Consider component complexity and business value when prioritizing migrations'
    ],
    examples: [
      {
        title: 'Enterprise Aura Component Example',
        description: 'Complex Aura component demonstrating advanced patterns and best practices',
        code: `<!-- OpportunityDashboard.cmp -->
<aura:component controller="OpportunityDashboardController" 
                implements="force:appHostable,flexipage:availableForAllPageTypes,force:hasRecordId">
    
    <!-- Attributes -->
    <aura:attribute name="opportunities" type="Opportunity[]" default="[]"/>
    <aura:attribute name="selectedOpportunity" type="Opportunity"/>
    <aura:attribute name="isLoading" type="Boolean" default="true"/>
    <aura:attribute name="errorMessage" type="String"/>
    <aura:attribute name="filters" type="Object" default="{}"/>
    <aura:attribute name="chartData" type="Object"/>
    
    <!-- Events -->
    <aura:registerEvent name="opportunitySelected" type="c:OpportunitySelectedEvent"/>
    <aura:handler name="init" value="{!this}" action="{!c.doInit}"/>
    <aura:handler name="opportunityUpdated" event="c:OpportunityUpdatedEvent" action="{!c.handleOpportunityUpdate}"/>
    
    <!-- Component Body -->
    <div class="slds-card">
        <div class="slds-card__header slds-grid">
            <header class="slds-media slds-media_center slds-has-flexi-truncate">
                <div class="slds-media__figure">
                    <lightning:icon iconName="standard:opportunity" size="medium"/>
                </div>
                <div class="slds-media__body">
                    <h2 class="slds-card__header-title">
                        <span>Opportunity Dashboard</span>
                    </h2>
                </div>
            </header>
            <div class="slds-no-flex">
                <lightning:button variant="brand" 
                                label="Refresh" 
                                onclick="{!c.refreshData}"
                                disabled="{!v.isLoading}"/>
            </div>
        </div>
        
        <div class="slds-card__body slds-card__body_inner">
            <!-- Loading Spinner -->
            <aura:if isTrue="{!v.isLoading}">
                <lightning:spinner alternativeText="Loading opportunities..." size="medium"/>
            </aura:if>
            
            <!-- Error Message -->
            <aura:if isTrue="{!and(not(v.isLoading), not(empty(v.errorMessage)))}">
                <div class="slds-notify slds-notify_alert slds-theme_alert-texture slds-theme_error">
                    <span class="slds-assistive-text">Error</span>
                    <h2>{!v.errorMessage}</h2>
                </div>
            </aura:if>
            
            <!-- Dashboard Content -->
            <aura:if isTrue="{!and(not(v.isLoading), empty(v.errorMessage))}">
                <!-- Filters Section -->
                <div class="slds-grid slds-wrap slds-gutters slds-m-bottom_medium">
                    <div class="slds-col slds-size_1-of-1 slds-medium-size_1-of-3">
                        <lightning:select name="stageFilter" 
                                        label="Stage" 
                                        value="{!v.filters.stage}"
                                        onchange="{!c.handleFilterChange}">
                            <option value="">All Stages</option>
                            <option value="Prospecting">Prospecting</option>
                            <option value="Qualification">Qualification</option>
                            <option value="Needs Analysis">Needs Analysis</option>
                            <option value="Value Proposition">Value Proposition</option>
                            <option value="Id. Decision Makers">Id. Decision Makers</option>
                            <option value="Proposal/Price Quote">Proposal/Price Quote</option>
                            <option value="Negotiation/Review">Negotiation/Review</option>
                        </lightning:select>
                    </div>
                    <div class="slds-col slds-size_1-of-1 slds-medium-size_1-of-3">
                        <lightning:input type="number" 
                                       name="minAmount" 
                                       label="Minimum Amount" 
                                       value="{!v.filters.minAmount}"
                                       onchange="{!c.handleFilterChange}"/>
                    </div>
                    <div class="slds-col slds-size_1-of-1 slds-medium-size_1-of-3">
                        <lightning:input type="date" 
                                       name="closeDateFrom" 
                                       label="Close Date From" 
                                       value="{!v.filters.closeDateFrom}"
                                       onchange="{!c.handleFilterChange}"/>
                    </div>
                </div>
                
                <!-- Chart Section -->
                <div class="slds-m-bottom_medium">
                    <c:OpportunityChart chartData="{!v.chartData}"/>
                </div>
                
                <!-- Opportunities Table -->
                <div class="slds-scrollable_x">
                    <table class="slds-table slds-table_cell-buffer slds-table_bordered">
                        <thead>
                            <tr class="slds-line-height_reset">
                                <th class="slds-text-title_caps" scope="col">
                                    <div class="slds-truncate" title="Name">Name</div>
                                </th>
                                <th class="slds-text-title_caps" scope="col">
                                    <div class="slds-truncate" title="Account">Account</div>
                                </th>
                                <th class="slds-text-title_caps" scope="col">
                                    <div class="slds-truncate" title="Stage">Stage</div>
                                </th>
                                <th class="slds-text-title_caps" scope="col">
                                    <div class="slds-truncate" title="Amount">Amount</div>
                                </th>
                                <th class="slds-text-title_caps" scope="col">
                                    <div class="slds-truncate" title="Close Date">Close Date</div>
                                </th>
                                <th class="slds-text-title_caps" scope="col">
                                    <div class="slds-truncate" title="Actions">Actions</div>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <aura:iteration items="{!v.opportunities}" var="opp">
                                <tr class="slds-hint-parent">
                                    <td data-label="Name">
                                        <div class="slds-truncate">
                                            <a href="{!'/' + opp.Id}" target="_blank">{!opp.Name}</a>
                                        </div>
                                    </td>
                                    <td data-label="Account">
                                        <div class="slds-truncate">{!opp.Account.Name}</div>
                                    </td>
                                    <td data-label="Stage">
                                        <div class="slds-truncate">
                                            <lightning:badge label="{!opp.StageName}" 
                                                           variant="{!c.getStageVariant(opp.StageName)}"/>
                                        </div>
                                    </td>
                                    <td data-label="Amount">
                                        <div class="slds-truncate">
                                            <lightning:formattedNumber value="{!opp.Amount}" 
                                                                     style="currency" 
                                                                     currencyCode="USD"/>
                                        </div>
                                    </td>
                                    <td data-label="Close Date">
                                        <div class="slds-truncate">
                                            <lightning:formattedDateTime value="{!opp.CloseDate}" 
                                                                       year="numeric" 
                                                                       month="short" 
                                                                       day="2-digit"/>
                                        </div>
                                    </td>
                                    <td data-label="Actions">
                                        <lightning:buttonMenu alternativeText="Show menu" 
                                                            iconSize="x-small" 
                                                            menuAlignment="right">
                                            <lightning:menuItem value="{!opp.Id}" 
                                                              label="View Details" 
                                                              onclick="{!c.viewOpportunity}"/>
                                            <lightning:menuItem value="{!opp.Id}" 
                                                              label="Edit" 
                                                              onclick="{!c.editOpportunity}"/>
                                            <lightning:menuItem value="{!opp.Id}" 
                                                              label="Clone" 
                                                              onclick="{!c.cloneOpportunity}"/>
                                        </lightning:buttonMenu>
                                    </td>
                                </tr>
                            </aura:iteration>
                        </tbody>
                    </table>
                </div>
            </aura:if>
        </div>
    </div>
</aura:component>

/* OpportunityDashboardController.js */
({
    doInit: function(component, event, helper) {
        helper.loadOpportunities(component);
        helper.loadChartData(component);
    },
    
    refreshData: function(component, event, helper) {
        component.set("v.isLoading", true);
        component.set("v.errorMessage", "");
        helper.loadOpportunities(component);
        helper.loadChartData(component);
    },
    
    handleFilterChange: function(component, event, helper) {
        var fieldName = event.getSource().get("v.name");
        var fieldValue = event.getSource().get("v.value");
        var filters = component.get("v.filters");
        
        filters[fieldName] = fieldValue;
        component.set("v.filters", filters);
        
        // Debounce the filter application
        helper.debounceApplyFilters(component);
    },
    
    viewOpportunity: function(component, event, helper) {
        var oppId = event.getParam("value");
        helper.navigateToRecord(oppId);
    },
    
    editOpportunity: function(component, event, helper) {
        var oppId = event.getParam("value");
        helper.openEditModal(component, oppId);
    },
    
    cloneOpportunity: function(component, event, helper) {
        var oppId = event.getParam("value");
        helper.cloneOpportunity(component, oppId);
    },
    
    handleOpportunityUpdate: function(component, event, helper) {
        var updatedOppId = event.getParam("opportunityId");
        helper.refreshOpportunity(component, updatedOppId);
    },
    
    getStageVariant: function(stageName) {
        var stageVariants = {
            'Prospecting': 'base',
            'Qualification': 'warning',
            'Needs Analysis': 'warning',
            'Value Proposition': 'warning',
            'Id. Decision Makers': 'warning',
            'Proposal/Price Quote': 'success',
            'Negotiation/Review': 'success',
            'Closed Won': 'success',
            'Closed Lost': 'error'
        };
        
        return stageVariants[stageName] || 'base';
    }
})

/* OpportunityDashboardHelper.js */
({
    loadOpportunities: function(component) {
        var action = component.get("c.getOpportunities");
        var filters = component.get("v.filters");
        
        action.setParams({
            "filters": JSON.stringify(filters)
        });
        
        action.setCallback(this, function(response) {
            component.set("v.isLoading", false);
            
            if (response.getState() === "SUCCESS") {
                var opportunities = response.getReturnValue();
                component.set("v.opportunities", opportunities);
                component.set("v.errorMessage", "");
            } else {
                var errors = response.getError();
                var errorMessage = "Unknown error";
                if (errors && errors[0] && errors[0].message) {
                    errorMessage = errors[0].message;
                }
                component.set("v.errorMessage", errorMessage);
                this.showToast("Error", errorMessage, "error");
            }
        });
        
        $A.enqueueAction(action);
    },
    
    loadChartData: function(component) {
        var action = component.get("c.getChartData");
        var filters = component.get("v.filters");
        
        action.setParams({
            "filters": JSON.stringify(filters)
        });
        
        action.setCallback(this, function(response) {
            if (response.getState() === "SUCCESS") {
                var chartData = response.getReturnValue();
                component.set("v.chartData", chartData);
            }
        });
        
        $A.enqueueAction(action);
    },
    
    debounceApplyFilters: function(component) {
        // Clear existing timeout
        var timeoutId = component.get("v.filterTimeoutId");
        if (timeoutId) {
            clearTimeout(timeoutId);
        }
        
        // Set new timeout
        var newTimeoutId = setTimeout(function() {
            component.set("v.isLoading", true);
            this.loadOpportunities(component);
            this.loadChartData(component);
        }.bind(this), 500);
        
        component.set("v.filterTimeoutId", newTimeoutId);
    },
    
    navigateToRecord: function(recordId) {
        var navEvt = $A.get("e.force:navigateToSObject");
        navEvt.setParams({
            "recordId": recordId,
            "slideDevName": "detail"
        });
        navEvt.fire();
    },
    
    openEditModal: function(component, oppId) {
        var editRecordEvent = $A.get("e.force:editRecord");
        editRecordEvent.setParams({
            "recordId": oppId
        });
        editRecordEvent.fire();
    },
    
    cloneOpportunity: function(component, oppId) {
        var action = component.get("c.cloneOpportunity");
        action.setParams({
            "opportunityId": oppId
        });
        
        action.setCallback(this, function(response) {
            if (response.getState() === "SUCCESS") {
                var clonedOppId = response.getReturnValue();
                this.showToast("Success", "Opportunity cloned successfully", "success");
                this.navigateToRecord(clonedOppId);
            } else {
                var errors = response.getError();
                var errorMessage = "Failed to clone opportunity";
                if (errors && errors[0] && errors[0].message) {
                    errorMessage = errors[0].message;
                }
                this.showToast("Error", errorMessage, "error");
            }
        });
        
        $A.enqueueAction(action);
    },
    
    refreshOpportunity: function(component, oppId) {
        // Refresh the specific opportunity in the list
        var opportunities = component.get("v.opportunities");
        var action = component.get("c.getOpportunityById");
        
        action.setParams({
            "opportunityId": oppId
        });
        
        action.setCallback(this, function(response) {
            if (response.getState() === "SUCCESS") {
                var updatedOpp = response.getReturnValue();
                var updatedOpportunities = opportunities.map(function(opp) {
                    return opp.Id === oppId ? updatedOpp : opp;
                });
                component.set("v.opportunities", updatedOpportunities);
            }
        });
        
        $A.enqueueAction(action);
    },
    
    showToast: function(title, message, type) {
        var toastEvent = $A.get("e.force:showToast");
        toastEvent.setParams({
            "title": title,
            "message": message,
            "type": type
        });
        toastEvent.fire();
    }
})`,
        language: 'javascript',
        explanation: 'This comprehensive Aura component demonstrates enterprise-level patterns including proper MVC separation, error handling, filtering, debouncing, event handling, and integration with Lightning Design System. The component shows how to build complex, maintainable Aura applications while following best practices for performance and user experience.'
      }
    ],
    limitations: [
      'Aura is in maintenance mode with no new features being added',
      'Performance is generally slower compared to Lightning Web Components',
      'Larger bundle size and memory footprint than LWC',
      'Limited modern JavaScript features and browser API access',
      'More complex debugging and development experience'
    ],
    architecturalConsiderations: [
      'Plan migration strategy from Aura to Lightning Web Components',
      'Prioritize component migration based on business value and complexity',
      'Maintain existing Aura components while preventing new Aura development',
      'Consider component interdependencies when planning migrations',
      'Train development teams on LWC to prepare for future development'
    ]
  },

  // LIGHTNING WEB COMPONENTS
  {
    id: 'lwc-fundamentals',
    title: 'Lightning Web Components Fundamentals',
    section: 'lwc',
    content: `
      <p>Lightning Web Components (LWC) represents Salesforce's modern component framework built on web standards. LWC provides better performance, smaller bundle sizes, and leverages modern JavaScript features while maintaining seamless integration with the Salesforce platform.</p>
      
      <h3>Web Standards Foundation</h3>
      <p>LWC is built on modern web standards:</p>
      <ul>
        <li><strong>Custom Elements:</strong> Define new HTML elements with custom behavior</li>
        <li><strong>Shadow DOM:</strong> Encapsulated DOM and styling for components</li>
        <li><strong>ES6+ Modules:</strong> Modern JavaScript module system</li>
        <li><strong>Templates:</strong> HTML templates with reactive data binding</li>
        <li><strong>Decorators:</strong> @api, @track, @wire for component metadata</li>
      </ul>
      
      <h3>Component Architecture</h3>
      <p>LWC components consist of three main files:</p>
      <ul>
        <li><strong>HTML Template:</strong> Component markup and structure</li>
        <li><strong>JavaScript Class:</strong> Component logic and lifecycle management</li>
        <li><strong>CSS Stylesheet:</strong> Component-specific styling (optional)</li>
        <li><strong>Configuration File:</strong> Component metadata and capabilities</li>
      </ul>
      
      <h3>Reactive Properties and Data Binding</h3>
      <p>LWC provides sophisticated data binding capabilities:</p>
      <ul>
        <li><strong>@api:</strong> Public properties exposed to parent components</li>
        <li><strong>@track:</strong> Private reactive properties (deprecated in favor of automatic tracking)</li>
        <li><strong>@wire:</strong> Declarative data binding to Apex methods and Lightning Data Service</li>
        <li><strong>Getters:</strong> Computed properties for derived values</li>
      </ul>
      
      <h3>Enterprise Development Patterns</h3>
      <p>Advanced LWC development involves sophisticated patterns:</p>
      <ul>
        <li><strong>Component Communication:</strong> Parent-child and sibling component interaction</li>
        <li><strong>Event Handling:</strong> Custom events and event propagation</li>
        <li><strong>Error Boundaries:</strong> Graceful error handling and recovery</li>
        <li><strong>Performance Optimization:</strong> Lazy loading and efficient rendering</li>
      </ul>
    `,
    keyPoints: [
      'LWC is the preferred framework for new Salesforce component development',
      'Built on web standards for better performance and developer experience',
      'Use @wire for efficient data binding and automatic cache management',
      'Implement proper error handling and loading states for production components',
      'Follow LWC best practices for component communication and state management'
    ],
    examples: [
      {
        title: 'Enterprise Data Management Component',
        description: 'Comprehensive LWC component with advanced patterns and error handling',
        code: `<!-- opportunityManager.html -->
<template>
    <lightning-card title="Opportunity Manager" icon-name="standard:opportunity">
        <div slot="actions">
            <lightning-button-group>
                <lightning-button 
                    variant="neutral" 
                    label="Refresh" 
                    icon-name="utility:refresh"
                    onclick={handleRefresh}
                    disabled={isLoading}>
                </lightning-button>
                <lightning-button 
                    variant="brand" 
                    label="New Opportunity" 
                    icon-name="utility:add"
                    onclick={handleNewOpportunity}>
                </lightning-button>
            </lightning-button-group>
        </div>
        
        <!-- Search and Filters -->
        <div class="slds-p-horizontal_medium">
            <div class="slds-grid slds-wrap slds-gutters">
                <div class="slds-col slds-size_1-of-1 slds-medium-size_1-of-2 slds-large-size_1-of-3">
                    <lightning-input 
                        type="search"
                        label="Search Opportunities"
                        value={searchTerm}
                        onchange={handleSearchChange}
                        placeholder="Search by name, account, or stage...">
                    </lightning-input>
                </div>
                <div class="slds-col slds-size_1-of-1 slds-medium-size_1-of-2 slds-large-size_1-of-3">
                    <lightning-combobox
                        name="stageFilter"
                        label="Filter by Stage"
                        value={selectedStage}
                        placeholder="All Stages"
                        options={stageOptions}
                        onchange={handleStageChange}>
                    </lightning-combobox>
                </div>
                <div class="slds-col slds-size_1-of-1 slds-medium-size_1-of-2 slds-large-size_1-of-3">
                    <lightning-input 
                        type="number"
                        label="Minimum Amount"
                        value={minAmount}
                        onchange={handleAmountChange}
                        formatter="currency">
                    </lightning-input>
                </div>
            </div>
        </div>
        
        <!-- Loading State -->
        <template if:true={isLoading}>
            <div class="slds-p-around_medium">
                <lightning-spinner 
                    alternative-text="Loading opportunities..." 
                    size="medium">
                </lightning-spinner>
            </div>
        </template>
        
        <!-- Error State -->
        <template if:true={error}>
            <div class="slds-p-around_medium">
                <div class="slds-notify slds-notify_alert slds-theme_alert-texture slds-theme_error">
                    <span class="slds-assistive-text">Error</span>
                    <h2>
                        <lightning-icon 
                            icon-name="utility:error" 
                            size="x-small" 
                            class="slds-m-right_x-small">
                        </lightning-icon>
                        {error.body.message}
                    </h2>
                    <lightning-button 
                        variant="neutral" 
                        label="Try Again" 
                        onclick={handleRetry}
                        class="slds-m-top_small">
                    </lightning-button>
                </div>
            </div>
        </template>
        
        <!-- Data Table -->
        <template if:false={isLoading}>
            <template if:false={error}>
                <template if:true={hasOpportunities}>
                    <div class="slds-p-horizontal_medium">
                        <lightning-datatable
                            key-field="Id"
                            data={filteredOpportunities}
                            columns={columns}
                            onrowaction={handleRowAction}
                            onsort={handleSort}
                            sorted-by={sortedBy}
                            sorted-direction={sortDirection}
                            hide-checkbox-column="true"
                            show-row-number-column="true"
                            resize-column-disabled="false">
                        </lightning-datatable>
                    </div>
                    
                    <!-- Pagination -->
                    <div class="slds-p-around_medium">
                        <div class="slds-grid slds-grid_align-spread slds-grid_vertical-align-center">
                            <div class="slds-col">
                                <p class="slds-text-body_small">
                                    Showing {startRecord} to {endRecord} of {totalRecords} opportunities
                                </p>
                            </div>
                            <div class="slds-col slds-no-flex">
                                <lightning-button-group>
                                    <lightning-button 
                                        variant="neutral" 
                                        label="Previous" 
                                        icon-name="utility:chevronleft"
                                        icon-position="left"
                                        onclick={handlePrevious}
                                        disabled={isFirstPage}>
                                    </lightning-button>
                                    <lightning-button 
                                        variant="neutral" 
                                        label="Next" 
                                        icon-name="utility:chevronright"
                                        icon-position="right"
                                        onclick={handleNext}
                                        disabled={isLastPage}>
                                    </lightning-button>
                                </lightning-button-group>
                            </div>
                        </div>
                    </div>
                </template>
                
                <!-- Empty State -->
                <template if:false={hasOpportunities}>
                    <div class="slds-p-around_large slds-text-align_center">
                        <lightning-icon 
                            icon-name="standard:opportunity" 
                            size="large" 
                            class="slds-m-bottom_medium">
                        </lightning-icon>
                        <h3 class="slds-text-heading_medium slds-m-bottom_small">
                            No opportunities found
                        </h3>
                        <p class="slds-text-body_regular slds-m-bottom_medium">
                            Try adjusting your search criteria or create a new opportunity.
                        </p>
                        <lightning-button 
                            variant="brand" 
                            label="Create Opportunity" 
                            onclick={handleNewOpportunity}>
                        </lightning-button>
                    </div>
                </template>
            </template>
        </template>
    </lightning-card>
    
    <!-- Opportunity Detail Modal -->
    <template if:true={showModal}>
        <section role="dialog" tabindex="-1" class="slds-modal slds-fade-in-open">
            <div class="slds-modal__container">
                <header class="slds-modal__header">
                    <button class="slds-button slds-button_icon slds-modal__close slds-button_icon-inverse" 
                            title="Close" onclick={closeModal}>
                        <lightning-icon icon-name="utility:close" size="small"></lightning-icon>
                        <span class="slds-assistive-text">Close</span>
                    </button>
                    <h2 class="slds-text-heading_medium slds-hyphenate">
                        {selectedOpportunity.Name}
                    </h2>
                </header>
                <div class="slds-modal__content slds-p-around_medium">
                    <c-opportunity-detail 
                        opportunity-id={selectedOpportunity.Id}
                        onopportunityupdate={handleOpportunityUpdate}>
                    </c-opportunity-detail>
                </div>
            </div>
        </section>
        <div class="slds-backdrop slds-backdrop_open"></div>
    </template>
</template>

// opportunityManager.js
import { LightningElement, wire, track } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { NavigationMixin } from 'lightning/navigation';
import { refreshApex } from '@salesforce/apex';
import getOpportunities from '@salesforce/apex/OpportunityController.getOpportunities';
import getOpportunityCount from '@salesforce/apex/OpportunityController.getOpportunityCount';

const COLUMNS = [
    {
        label: 'Opportunity Name',
        fieldName: 'opportunityUrl',
        type: 'url',
        typeAttributes: {
            label: { fieldName: 'Name' },
            target: '_blank'
        },
        sortable: true
    },
    {
        label: 'Account',
        fieldName: 'accountUrl',
        type: 'url',
        typeAttributes: {
            label: { fieldName: 'AccountName' },
            target: '_blank'
        },
        sortable: true
    },
    {
        label: 'Stage',
        fieldName: 'StageName',
        type: 'text',
        cellAttributes: {
            class: { fieldName: 'stageClass' }
        },
        sortable: true
    },
    {
        label: 'Amount',
        fieldName: 'Amount',
        type: 'currency',
        sortable: true,
        cellAttributes: { alignment: 'right' }
    },
    {
        label: 'Close Date',
        fieldName: 'CloseDate',
        type: 'date',
        sortable: true
    },
    {
        label: 'Probability',
        fieldName: 'Probability',
        type: 'percent',
        typeAttributes: { minimumFractionDigits: 0 },
        sortable: true,
        cellAttributes: { alignment: 'right' }
    },
    {
        type: 'action',
        typeAttributes: {
            rowActions: [
                { label: 'View', name: 'view' },
                { label: 'Edit', name: 'edit' },
                { label: 'Clone', name: 'clone' },
                { label: 'Delete', name: 'delete' }
            ]
        }
    }
];

const STAGE_OPTIONS = [
    { label: 'Prospecting', value: 'Prospecting' },
    { label: 'Qualification', value: 'Qualification' },
    { label: 'Needs Analysis', value: 'Needs Analysis' },
    { label: 'Value Proposition', value: 'Value Proposition' },
    { label: 'Id. Decision Makers', value: 'Id. Decision Makers' },
    { label: 'Proposal/Price Quote', value: 'Proposal/Price Quote' },
    { label: 'Negotiation/Review', value: 'Negotiation/Review' }
];

export default class OpportunityManager extends NavigationMixin(LightningElement) {
    // Public properties
    columns = COLUMNS;
    stageOptions = STAGE_OPTIONS;
    
    // Private properties
    @track opportunities = [];
    @track filteredOpportunities = [];
    @track error;
    @track isLoading = true;
    @track showModal = false;
    @track selectedOpportunity;
    
    // Filter properties
    searchTerm = '';
    selectedStage = '';
    minAmount = '';
    
    // Pagination properties
    pageSize = 25;
    currentPage = 1;
    totalRecords = 0;
    
    // Sorting properties
    sortedBy = 'CloseDate';
    sortDirection = 'asc';
    
    // Search debouncing
    searchTimeout;
    
    // Wire methods
    @wire(getOpportunities, { 
        searchTerm: '$searchTerm',
        stage: '$selectedStage',
        minAmount: '$minAmount',
        sortBy: '$sortedBy',
        sortDirection: '$sortDirection',
        limitSize: '$pageSize',
        offset: '$offset'
    })
    wiredOpportunities(result) {
        this.wiredOpportunitiesResult = result;
        if (result.data) {
            this.opportunities = this.processOpportunityData(result.data);
            this.filteredOpportunities = [...this.opportunities];
            this.error = undefined;
        } else if (result.error) {
            this.error = result.error;
            this.opportunities = [];
            this.filteredOpportunities = [];
        }
        this.isLoading = false;
    }
    
    @wire(getOpportunityCount, {
        searchTerm: '$searchTerm',
        stage: '$selectedStage',
        minAmount: '$minAmount'
    })
    wiredCount({ error, data }) {
        if (data) {
            this.totalRecords = data;
        } else if (error) {
            console.error('Error getting count:', error);
        }
    }
    
    // Getters
    get hasOpportunities() {
        return this.filteredOpportunities && this.filteredOpportunities.length > 0;
    }
    
    get offset() {
        return (this.currentPage - 1) * this.pageSize;
    }
    
    get startRecord() {
        return this.totalRecords === 0 ? 0 : this.offset + 1;
    }
    
    get endRecord() {
        return Math.min(this.offset + this.pageSize, this.totalRecords);
    }
    
    get isFirstPage() {
        return this.currentPage === 1;
    }
    
    get isLastPage() {
        return this.currentPage >= Math.ceil(this.totalRecords / this.pageSize);
    }
    
    // Event handlers
    handleSearchChange(event) {
        const searchTerm = event.target.value;
        
        // Clear existing timeout
        if (this.searchTimeout) {
            clearTimeout(this.searchTimeout);
        }
        
        // Set new timeout for debouncing
        this.searchTimeout = setTimeout(() => {
            this.searchTerm = searchTerm;
            this.currentPage = 1; // Reset to first page
        }, 300);
    }
    
    handleStageChange(event) {
        this.selectedStage = event.detail.value;
        this.currentPage = 1;
    }
    
    handleAmountChange(event) {
        this.minAmount = event.target.value;
        this.currentPage = 1;
    }
    
    handleSort(event) {
        this.sortedBy = event.detail.fieldName;
        this.sortDirection = event.detail.sortDirection;
    }
    
    handleRowAction(event) {
        const actionName = event.detail.action.name;
        const row = event.detail.row;
        
        switch (actionName) {
            case 'view':
                this.viewOpportunity(row);
                break;
            case 'edit':
                this.editOpportunity(row);
                break;
            case 'clone':
                this.cloneOpportunity(row);
                break;
            case 'delete':
                this.deleteOpportunity(row);
                break;
        }
    }
    
    handleRefresh() {
        this.isLoading = true;
        return refreshApex(this.wiredOpportunitiesResult);
    }
    
    handleNewOpportunity() {
        this[NavigationMixin.Navigate]({
            type: 'standard__objectPage',
            attributes: {
                objectApiName: 'Opportunity',
                actionName: 'new'
            }
        });
    }
    
    handleRetry() {
        this.error = undefined;
        this.handleRefresh();
    }
    
    handlePrevious() {
        if (!this.isFirstPage) {
            this.currentPage--;
        }
    }
    
    handleNext() {
        if (!this.isLastPage) {
            this.currentPage++;
        }
    }
    
    handleOpportunityUpdate() {
        this.closeModal();
        this.handleRefresh();
        this.showToast('Success', 'Opportunity updated successfully', 'success');
    }
    
    // Action methods
    viewOpportunity(opportunity) {
        this.selectedOpportunity = opportunity;
        this.showModal = true;
    }
    
    editOpportunity(opportunity) {
        this[NavigationMixin.Navigate]({
            type: 'standard__recordPage',
            attributes: {
                recordId: opportunity.Id,
                objectApiName: 'Opportunity',
                actionName: 'edit'
            }
        });
    }
    
    cloneOpportunity(opportunity) {
        this[NavigationMixin.Navigate]({
            type: 'standard__recordPage',
            attributes: {
                recordId: opportunity.Id,
                objectApiName: 'Opportunity',
                actionName: 'clone'
            }
        });
    }
    
    deleteOpportunity(opportunity) {
        // Implementation would show confirmation dialog and handle deletion
        this.showToast('Info', 'Delete functionality would be implemented here', 'info');
    }
    
    closeModal() {
        this.showModal = false;
        this.selectedOpportunity = null;
    }
    
    // Utility methods
    processOpportunityData(opportunities) {
        return opportunities.map(opp => {
            return {
                ...opp,
                AccountName: opp.Account?.Name,
                opportunityUrl: \`/\${opp.Id}\`,
                accountUrl: \`/\${opp.AccountId}\`,
                stageClass: this.getStageClass(opp.StageName)
            };
        });
    }
    
    getStageClass(stageName) {
        const stageClasses = {
            'Prospecting': 'slds-text-color_weak',
            'Qualification': 'slds-text-color_default',
            'Needs Analysis': 'slds-text-color_default',
            'Value Proposition': 'slds-text-color_default',
            'Id. Decision Makers': 'slds-text-color_default',
            'Proposal/Price Quote': 'slds-text-color_success',
            'Negotiation/Review': 'slds-text-color_success',
            'Closed Won': 'slds-text-color_success',
            'Closed Lost': 'slds-text-color_error'
        };
        
        return stageClasses[stageName] || 'slds-text-color_default';
    }
    
    showToast(title, message, variant) {
        const evt = new ShowToastEvent({
            title: title,
            message: message,
            variant: variant
        });
        this.dispatchEvent(evt);
    }
}

/* opportunityManager.css */
.slds-modal__container {
    max-width: 80rem;
    width: 90%;
}

.stage-badge {
    border-radius: 0.25rem;
    padding: 0.125rem 0.5rem;
    font-size: 0.75rem;
    font-weight: 600;
    text-transform: uppercase;
}

.stage-prospecting {
    background-color: #f3f3f3;
    color: #3e3e3c;
}

.stage-qualification,
.stage-needs-analysis,
.stage-value-proposition,
.stage-decision-makers {
    background-color: #ffd803;
    color: #3e3e3c;
}

.stage-proposal,
.stage-negotiation {
    background-color: #4bca81;
    color: #ffffff;
}

.stage-closed-won {
    background-color: #2e844a;
    color: #ffffff;
}

.stage-closed-lost {
    background-color: #ea001e;
    color: #ffffff;
}`,
        language: 'javascript',
        explanation: 'This comprehensive LWC component demonstrates enterprise-level patterns including reactive data binding with @wire, advanced filtering and pagination, error handling, modal dialogs, and proper component communication. The component showcases modern JavaScript features, Lightning Design System integration, and follows LWC best practices for performance and maintainability.'
      }
    ],
    limitations: [
      'LWC components cannot directly access the global window object',
      'Limited support for third-party JavaScript libraries',
      'Shadow DOM encapsulation can complicate some styling scenarios',
      'Some Salesforce-specific features require Lightning Data Service or Apex',
      'Browser compatibility limited to modern browsers supporting web components'
    ],
    architecturalConsiderations: [
      'Design components for reusability across different contexts and applications',
      'Use Lightning Data Service (@wire) for efficient data access and caching',
      'Implement proper error boundaries and loading states for production applications',
      'Consider component composition and communication patterns for complex applications',
      'Plan for testing strategies including Jest unit tests and end-to-end testing'
    ]
  },

  // ARCHITECTURE & LIMITATIONS
  {
    id: 'platform-limits',
    title: 'Salesforce Platform Limitations',
    section: 'architecture',
    content: `
      <p>Understanding Salesforce platform limitations is crucial for architects and developers building scalable enterprise solutions. These limitations are designed to ensure platform stability and fair resource usage across all tenants in the multi-tenant environment.</p>
      
      <h3>Governor Limits Categories</h3>
      <p>Salesforce enforces several categories of limits:</p>
      <ul>
        <li><strong>Execution Limits:</strong> CPU time, heap size, and execution time constraints</li>
        <li><strong>Database Limits:</strong> SOQL queries, DML operations, and record processing</li>
        <li><strong>Integration Limits:</strong> HTTP callouts, email sending, and external connections</li>
        <li><strong>Storage Limits:</strong> Data storage, file storage, and API request limits</li>
        <li><strong>Feature Limits:</strong> Workflow rules, validation rules, and custom objects</li>
      </ul>
      
      <h3>Critical Execution Limits</h3>
      <p>Key limits that commonly impact enterprise applications:</p>
      <ul>
        <li><strong>CPU Time:</strong> 10 seconds synchronous, 60 seconds asynchronous</li>
        <li><strong>Heap Size:</strong> 6MB synchronous, 12MB asynchronous</li>
        <li><strong>SOQL Queries:</strong> 100 synchronous, 200 asynchronous per transaction</li>
        <li><strong>DML Statements:</strong> 150 per transaction</li>
        <li><strong>Records per DML:</strong> 10,000 records per operation</li>
        <li><strong>Callouts:</strong> 100 per transaction, 120-second timeout</li>
      </ul>
      
      <h3>Architectural Strategies</h3>
      <p>Effective strategies for working within platform limits:</p>
      <ul>
        <li><strong>Bulkification:</strong> Process multiple records efficiently</li>
        <li><strong>Asynchronous Processing:</strong> Use future, batch, and queueable for heavy operations</li>
        <li><strong>Selective Queries:</strong> Use indexed fields and efficient query patterns</li>
        <li><strong>Data Archiving:</strong> Manage data volumes through archiving strategies</li>
        <li><strong>External Processing:</strong> Offload complex operations to external systems</li>
      </ul>
      
      <h3>Monitoring and Optimization</h3>
      <p>Proactive monitoring helps prevent limit violations:</p>
      <ul>
        <li><strong>Debug Logs:</strong> Monitor resource usage in development</li>
        <li><strong>Event Monitoring:</strong> Track API usage and performance in production</li>
        <li><strong>Custom Monitoring:</strong> Build dashboards for limit tracking</li>
        <li><strong>Performance Testing:</strong> Validate limits compliance under load</li>
      </ul>
    `,
    keyPoints: [
      'Design all code with governor limits in mind from the beginning',
      'Use asynchronous processing for operations that may exceed synchronous limits',
      'Implement efficient query patterns and avoid unnecessary database operations',
      'Monitor resource usage proactively to prevent production issues',
      'Plan data archiving strategies for long-term scalability'
    ],
    examples: [
      {
        title: 'Governor Limits Monitoring Framework',
        description: 'Comprehensive system for tracking and alerting on governor limit usage',
        code: `// Governor Limits Monitoring Utility
public class GovernorLimitsMonitor {
    
    private static final Integer WARNING_THRESHOLD_PERCENT = 80;
    private static final Integer CRITICAL_THRESHOLD_PERCENT = 95;
    
    public static void logLimitsUsage(String context) {
        LimitsSnapshot snapshot = captureLimitsSnapshot();
        
        // Check for warnings and critical usage
        List<LimitViolation> violations = analyzeLimitsUsage(snapshot);
        
        if (!violations.isEmpty()) {
            logViolations(context, violations, snapshot);
            
            // Send alerts for critical violations
            List<LimitViolation> criticalViolations = getCriticalViolations(violations);
            if (!criticalViolations.isEmpty()) {
                sendCriticalAlerts(context, criticalViolations);
            }
        }
        
        // Log detailed usage for monitoring
        createLimitsLogRecord(context, snapshot, violations);
    }
    
    public static LimitsSnapshot captureLimitsSnapshot() {
        LimitsSnapshot snapshot = new LimitsSnapshot();
        
        // CPU Time
        snapshot.cpuTimeUsed = Limits.getCpuTime();
        snapshot.cpuTimeLimit = Limits.getLimitCpuTime();
        
        // Heap Size
        snapshot.heapSizeUsed = Limits.getHeapSize();
        snapshot.heapSizeLimit = Limits.getLimitHeapSize();
        
        // SOQL Queries
        snapshot.soqlQueriesUsed = Limits.getQueries();
        snapshot.soqlQueriesLimit = Limits.getLimitQueries();
        
        // DML Statements
        snapshot.dmlStatementsUsed = Limits.getDMLStatements();
        snapshot.dmlStatementsLimit = Limits.getLimitDMLStatements();
        
        // DML Rows
        snapshot.dmlRowsUsed = Limits.getDMLRows();
        snapshot.dmlRowsLimit = Limits.getLimitDMLRows();
        
        // Callouts
        snapshot.calloutsUsed = Limits.getCallouts();
        snapshot.calloutsLimit = Limits.getLimitCallouts();
        
        // Email Invocations
        snapshot.emailInvocationsUsed = Limits.getEmailInvocations();
        snapshot.emailInvocationsLimit = Limits.getLimitEmailInvocations();
        
        // Future Calls
        snapshot.futureCallsUsed = Limits.getFutureCalls();
        snapshot.futureCallsLimit = Limits.getLimitFutureCalls();
        
        // Queueable Jobs
        snapshot.queueableJobsUsed = Limits.getQueueableJobs();
        snapshot.queueableJobsLimit = Limits.getLimitQueueableJobs();
        
        return snapshot;
    }
    
    private static List<LimitViolation> analyzeLimitsUsage(LimitsSnapshot snapshot) {
        List<LimitViolation> violations = new List<LimitViolation>();
        
        // Check CPU Time
        violations.addAll(checkLimit('CPU_TIME', snapshot.cpuTimeUsed, snapshot.cpuTimeLimit));
        
        // Check Heap Size
        violations.addAll(checkLimit('HEAP_SIZE', snapshot.heapSizeUsed, snapshot.heapSizeLimit));
        
        // Check SOQL Queries
        violations.addAll(checkLimit('SOQL_QUERIES', snapshot.soqlQueriesUsed, snapshot.soqlQueriesLimit));
        
        // Check DML Statements
        violations.addAll(checkLimit('DML_STATEMENTS', snapshot.dmlStatementsUsed, snapshot.dmlStatementsLimit));
        
        // Check DML Rows
        violations.addAll(checkLimit('DML_ROWS', snapshot.dmlRowsUsed, snapshot.dmlRowsLimit));
        
        // Check Callouts
        violations.addAll(checkLimit('CALLOUTS', snapshot.calloutsUsed, snapshot.calloutsLimit));
        
        // Check Email Invocations
        violations.addAll(checkLimit('EMAIL_INVOCATIONS', snapshot.emailInvocationsUsed, snapshot.emailInvocationsLimit));
        
        // Check Future Calls
        violations.addAll(checkLimit('FUTURE_CALLS', snapshot.futureCallsUsed, snapshot.futureCallsLimit));
        
        // Check Queueable Jobs
        violations.addAll(checkLimit('QUEUEABLE_JOBS', snapshot.queueableJobsUsed, snapshot.queueableJobsLimit));
        
        return violations;
    }
    
    private static List<LimitViolation> checkLimit(String limitType, Integer used, Integer total) {
        List<LimitViolation> violations = new List<LimitViolation>();
        
        if (total == 0) return violations; // Avoid division by zero
        
        Integer usagePercent = (used * 100) / total;
        
        if (usagePercent >= CRITICAL_THRESHOLD_PERCENT) {
            violations.add(new LimitViolation(limitType, used, total, usagePercent, 'CRITICAL'));
        } else if (usagePercent >= WARNING_THRESHOLD_PERCENT) {
            violations.add(new LimitViolation(limitType, used, total, usagePercent, 'WARNING'));
        }
        
        return violations;
    }
    
    private static void logViolations(String context, List<LimitViolation> violations, LimitsSnapshot snapshot) {
        String logMessage = 'Governor Limits Usage - Context: ' + context + '\\n';
        
        for (LimitViolation violation : violations) {
            logMessage += violation.limitType + ': ' + violation.used + '/' + violation.total + 
                         ' (' + violation.usagePercent + '%) - ' + violation.severity + '\\n';
        }
        
        System.debug(LoggingLevel.WARN, logMessage);
    }
    
    @future
    private static void sendCriticalAlerts(String context, List<LimitViolation> criticalViolations) {
        try {
            // Get alert recipients from custom settings
            Governor_Limits_Settings__c settings = Governor_Limits_Settings__c.getOrgDefaults();
            List<String> recipients = settings.Alert_Recipients__c?.split(',');
            
            if (recipients == null || recipients.isEmpty()) {
                return;
            }
            
            // Build email content
            String subject = 'CRITICAL: Governor Limits Alert - ' + context;
            String body = buildAlertEmailBody(context, criticalViolations);
            
            // Send email
            Messaging.SingleEmailMessage email = new Messaging.SingleEmailMessage();
            email.setToAddresses(recipients);
            email.setSubject(subject);
            email.setPlainTextBody(body);
            email.setHtmlBody(body.replace('\\n', '<br/>'));
            
            Messaging.sendEmail(new Messaging.SingleEmailMessage[] { email });
            
        } catch (Exception e) {
            System.debug(LoggingLevel.ERROR, 'Failed to send critical alert: ' + e.getMessage());
        }
    }
    
    private static String buildAlertEmailBody(String context, List<LimitViolation> violations) {
        String body = 'Critical governor limits usage detected in context: ' + context + '\\n\\n';
        body += 'Violations:\\n';
        
        for (LimitViolation violation : violations) {
            body += '- ' + violation.limitType + ': ' + violation.used + '/' + violation.total + 
                   ' (' + violation.usagePercent + '%)\\n';
        }
        
        body += '\\nPlease investigate immediately to prevent system failures.\\n';
        body += 'Timestamp: ' + System.now().format() + '\\n';
        
        return body;
    }
    
    private static void createLimitsLogRecord(String context, LimitsSnapshot snapshot, List<LimitViolation> violations) {
        try {
            Governor_Limits_Log__c logRecord = new Governor_Limits_Log__c(
                Context__c = context,
                Timestamp__c = System.now(),
                CPU_Time_Used__c = snapshot.cpuTimeUsed,
                CPU_Time_Limit__c = snapshot.cpuTimeLimit,
                Heap_Size_Used__c = snapshot.heapSizeUsed,
                Heap_Size_Limit__c = snapshot.heapSizeLimit,
                SOQL_Queries_Used__c = snapshot.soqlQueriesUsed,
                SOQL_Queries_Limit__c = snapshot.soqlQueriesLimit,
                DML_Statements_Used__c = snapshot.dmlStatementsUsed,
                DML_Statements_Limit__c = snapshot.dmlStatementsLimit,
                DML_Rows_Used__c = snapshot.dmlRowsUsed,
                DML_Rows_Limit__c = snapshot.dmlRowsLimit,
                Callouts_Used__c = snapshot.calloutsUsed,
                Callouts_Limit__c = snapshot.calloutsLimit,
                Has_Violations__c = !violations.isEmpty(),
                Violation_Count__c = violations.size(),
                Violation_Details__c = JSON.serialize(violations)
            );
            
            insert logRecord;
            
        } catch (Exception e) {
            System.debug(LoggingLevel.ERROR, 'Failed to create limits log record: ' + e.getMessage());
        }
    }
    
    private static List<LimitViolation> getCriticalViolations(List<LimitViolation> violations) {
        List<LimitViolation> criticalViolations = new List<LimitViolation>();
        
        for (LimitViolation violation : violations) {
            if (violation.severity == 'CRITICAL') {
                criticalViolations.add(violation);
            }
        }
        
        return criticalViolations;
    }
    
    // Data classes
    public class LimitsSnapshot {
        public Integer cpuTimeUsed;
        public Integer cpuTimeLimit;
        public Integer heapSizeUsed;
        public Integer heapSizeLimit;
        public Integer soqlQueriesUsed;
        public Integer soqlQueriesLimit;
        public Integer dmlStatementsUsed;
        public Integer dmlStatementsLimit;
        public Integer dmlRowsUsed;
        public Integer dmlRowsLimit;
        public Integer calloutsUsed;
        public Integer calloutsLimit;
        public Integer emailInvocationsUsed;
        public Integer emailInvocationsLimit;
        public Integer futureCallsUsed;
        public Integer futureCallsLimit;
        public Integer queueableJobsUsed;
        public Integer queueableJobsLimit;
    }
    
    public class LimitViolation {
        public String limitType;
        public Integer used;
        public Integer total;
        public Integer usagePercent;
        public String severity;
        
        public LimitViolation(String limitType, Integer used, Integer total, Integer usagePercent, String severity) {
            this.limitType = limitType;
            this.used = used;
            this.total = total;
            this.usagePercent = usagePercent;
            this.severity = severity;
        }
    }
}

// Usage in Service Classes
public class OpportunityService {
    
    public static void processOpportunities(List<Opportunity> opportunities) {
        String context = 'OpportunityService.processOpportunities';
        
        try {
            // Log initial limits
            GovernorLimitsMonitor.logLimitsUsage(context + ' - Start');
            
            // Process opportunities in chunks to avoid limits
            Integer chunkSize = 200;
            for (Integer i = 0; i < opportunities.size(); i += chunkSize) {
                Integer endIndex = Math.min(i + chunkSize, opportunities.size());
                List<Opportunity> chunk = opportunities.subList(i, endIndex);
                
                processOpportunityChunk(chunk);
                
                // Monitor limits after each chunk
                GovernorLimitsMonitor.logLimitsUsage(context + ' - Chunk ' + (i/chunkSize + 1));
            }
            
            // Log final limits
            GovernorLimitsMonitor.logLimitsUsage(context + ' - Complete');
            
        } catch (Exception e) {
            GovernorLimitsMonitor.logLimitsUsage(context + ' - Error: ' + e.getMessage());
            throw e;
        }
    }
    
    private static void processOpportunityChunk(List<Opportunity> opportunities) {
        // Implementation with bulkified operations
        Set<Id> accountIds = new Set<Id>();
        for (Opportunity opp : opportunities) {
            accountIds.add(opp.AccountId);
        }
        
        // Single SOQL query for all related accounts
        Map<Id, Account> accountMap = new Map<Id, Account>([
            SELECT Id, Name, Type, Industry 
            FROM Account 
            WHERE Id IN :accountIds
        ]);
        
        // Process opportunities with account data
        List<Opportunity> oppsToUpdate = new List<Opportunity>();
        for (Opportunity opp : opportunities) {
            Account acc = accountMap.get(opp.AccountId);
            if (acc != null) {
                // Business logic here
                opp.Account_Type__c = acc.Type;
                opp.Account_Industry__c = acc.Industry;
                oppsToUpdate.add(opp);
            }
        }
        
        // Single DML operation
        if (!oppsToUpdate.isEmpty()) {
            update oppsToUpdate;
        }
    }
}

// Batch Job with Limits Monitoring
global class DataProcessingBatch implements Database.Batchable<sObject>, Database.Stateful {
    
    global Integer totalProcessed = 0;
    global Integer totalErrors = 0;
    
    global Database.QueryLocator start(Database.BatchableContext bc) {
        GovernorLimitsMonitor.logLimitsUsage('DataProcessingBatch.start');
        
        return Database.getQueryLocator([
            SELECT Id, Name, Status__c, Last_Processed__c 
            FROM Custom_Object__c 
            WHERE Status__c = 'Pending'
            ORDER BY CreatedDate
        ]);
    }
    
    global void execute(Database.BatchableContext bc, List<Custom_Object__c> records) {
        String context = 'DataProcessingBatch.execute - Batch Size: ' + records.size();
        GovernorLimitsMonitor.logLimitsUsage(context + ' - Start');
        
        try {
            // Process records
            for (Custom_Object__c record : records) {
                processRecord(record);
                totalProcessed++;
            }
            
            // Update records
            update records;
            
            GovernorLimitsMonitor.logLimitsUsage(context + ' - Success');
            
        } catch (Exception e) {
            totalErrors++;
            GovernorLimitsMonitor.logLimitsUsage(context + ' - Error: ' + e.getMessage());
            throw e;
        }
    }
    
    global void finish(Database.BatchableContext bc) {
        GovernorLimitsMonitor.logLimitsUsage('DataProcessingBatch.finish');
        
        // Send completion notification
        AsyncApexJob job = [SELECT Id, Status, NumberOfErrors, JobItemsProcessed 
                           FROM AsyncApexJob WHERE Id = :bc.getJobId()];
        
        String subject = 'Data Processing Batch Completed';
        String body = 'Batch Job Status: ' + job.Status + '\\n' +
                     'Records Processed: ' + totalProcessed + '\\n' +
                     'Errors: ' + totalErrors + '\\n' +
                     'Job Items Processed: ' + job.JobItemsProcessed;
        
        // Send notification email
        // Implementation here
    }
    
    private void processRecord(Custom_Object__c record) {
        // Complex processing logic
        record.Status__c = 'Processed';
        record.Last_Processed__c = System.now();
        record.Processing_Notes__c = 'Processed by batch job';
    }
}`,
        language: 'apex',
        explanation: 'This comprehensive governor limits monitoring framework provides real-time tracking of resource usage with automated alerting for critical violations. The system demonstrates how to build proactive monitoring into enterprise applications, helping prevent limit violations before they cause system failures. The framework includes detailed logging, email alerts, and integration patterns for batch processing and service classes.'
      }
    ],
    limitations: [
      'Governor limits are enforced per transaction and cannot be increased',
      'Some limits are shared across all code execution in a transaction',
      'Asynchronous processing has higher limits but introduces complexity',
      'Platform events and streaming have separate limit categories',
      'Custom metadata and settings have their own storage and query limits'
    ],
    architecturalConsiderations: [
      'Design all code with bulkification patterns from the beginning',
      'Use asynchronous processing strategically for operations that may exceed limits',
      'Implement comprehensive monitoring and alerting for limit usage',
      'Plan data archiving and cleanup strategies for long-term scalability',
      'Consider external processing for operations that consistently approach limits'
    ]
  },
  {
    id: 'multi-org-strategy',
    title: 'Multi-Org Architecture Strategy',
    section: 'architecture',
    content: `
      <p>Multi-org architecture is a critical consideration for large enterprises using Salesforce. The decision between single-org and multi-org strategies impacts data integration, user experience, governance, and long-term scalability. Understanding the trade-offs and implementation patterns is essential for enterprise architects.</p>
      
      <h3>Multi-Org Scenarios</h3>
      <p>Common scenarios that drive multi-org decisions:</p>
      <ul>
        <li><strong>Geographic Separation:</strong> Different regions with distinct regulatory requirements</li>
        <li><strong>Business Unit Isolation:</strong> Separate business units with different processes</li>
        <li><strong>Acquisition Integration:</strong> Maintaining separate orgs during M&A activities</li>
        <li><strong>Development Lifecycle:</strong> Separate orgs for development, testing, and production</li>
        <li><strong>Data Sovereignty:</strong> Regulatory requirements for data residency</li>
        <li><strong>Performance Isolation:</strong> Separating high-volume operations</li>
      </ul>
      
      <h3>Single-Org vs Multi-Org Trade-offs</h3>
      <p>Key considerations for architectural decisions:</p>
      <ul>
        <li><strong>Data Integration:</strong> Single-org provides unified data; multi-org requires integration</li>
        <li><strong>User Experience:</strong> Single-org offers seamless UX; multi-org may require SSO</li>
        <li><strong>Reporting:</strong> Single-org enables cross-functional reporting; multi-org needs aggregation</li>
        <li><strong>Governance:</strong> Single-org simplifies governance; multi-org enables isolation</li>
        <li><strong>Scalability:</strong> Multi-org can provide better performance isolation</li>
        <li><strong>Compliance:</strong> Multi-org may be required for regulatory compliance</li>
      </ul>
      
      <h3>Integration Patterns</h3>
      <p>Multi-org environments require sophisticated integration:</p>
      <ul>
        <li><strong>Hub-and-Spoke:</strong> Central integration hub connecting all orgs</li>
        <li><strong>Peer-to-Peer:</strong> Direct integration between specific orgs</li>
        <li><strong>Event-Driven:</strong> Platform Events for real-time data synchronization</li>
        <li><strong>Batch Integration:</strong> Scheduled data synchronization processes</li>
        <li><strong>Master Data Management:</strong> Centralized master data with distribution</li>
      </ul>
      
      <h3>Governance and Operations</h3>
      <p>Multi-org environments require enhanced governance:</p>
      <ul>
        <li><strong>Release Management:</strong> Coordinated deployments across orgs</li>
        <li><strong>Security Management:</strong> Consistent security policies and SSO</li>
        <li><strong>Data Governance:</strong> Master data management and data quality</li>
        <li><strong>Monitoring:</strong> Centralized monitoring and alerting</li>
        <li><strong>Support:</strong> Unified support processes across orgs</li>
      </ul>
    `,
    keyPoints: [
      'Evaluate single-org solutions before considering multi-org architecture',
      'Multi-org decisions should be driven by business requirements, not technical preferences',
      'Plan for data integration and synchronization complexity in multi-org environments',
      'Implement consistent governance and security policies across all orgs',
      'Consider long-term maintenance and operational overhead of multi-org architecture'
    ],
    examples: [
      {
        title: 'Multi-Org Data Synchronization Framework',
        description: 'Comprehensive framework for synchronizing data between multiple Salesforce orgs',
        code: `// Multi-Org Synchronization Service
public class MultiOrgSyncService {
    
    private static final String SYNC_ENDPOINT_BASE = 'https://sync-hub.company.com/api/v1';
    private static final Map<String, OrgConfig> ORG_CONFIGS = new Map<String, OrgConfig>{
        'PROD_US' => new OrgConfig('https://company.my.salesforce.com', 'US_PROD_TOKEN'),
        'PROD_EU' => new OrgConfig('https://company-eu.my.salesforce.com', 'EU_PROD_TOKEN'),
        'PROD_APAC' => new OrgConfig('https://company-apac.my.salesforce.com', 'APAC_PROD_TOKEN')
    };
    
    // Synchronize Account data across orgs
    public static void syncAccountAcrossOrgs(Id accountId, String operation) {
        try {
            Account acc = getAccountWithDetails(accountId);
            if (acc == null) {
                throw new SyncException('Account not found: ' + accountId);
            }
            
            // Create sync message
            SyncMessage syncMessage = createAccountSyncMessage(acc, operation);
            
            // Determine target orgs based on business rules
            List<String> targetOrgs = determineTargetOrgs(acc);
            
            // Send to sync hub for distribution
            sendToSyncHub(syncMessage, targetOrgs);
            
            // Log sync activity
            logSyncActivity(accountId, 'Account', operation, targetOrgs);
            
        } catch (Exception e) {
            handleSyncError(accountId, 'Account', operation, e.getMessage());
        }
    }
    
    // Receive sync messages from other orgs
    @RestResource(urlMapping='/sync/inbound/*')
    global class SyncInboundService {
        
        @HttpPost
        global static SyncResponse receiveSync() {
            RestRequest req = RestContext.request;
            RestResponse res = RestContext.response;
            
            try {
                // Parse sync message
                SyncMessage message = (SyncMessage)JSON.deserialize(
                    req.requestBody.toString(), SyncMessage.class);
                
                // Validate message
                ValidationResult validation = validateSyncMessage(message);
                if (!validation.isValid) {
                    res.statusCode = 400;
                    return new SyncResponse(false, validation.errorMessage);
                }
                
                // Process sync based on object type
                Boolean success = processSyncMessage(message);
                
                res.statusCode = success ? 200 : 500;
                return new SyncResponse(success, success ? 'Sync processed successfully' : 'Sync processing failed');
                
            } catch (Exception e) {
                res.statusCode = 500;
                logError('Inbound sync processing failed: ' + e.getMessage());
                return new SyncResponse(false, 'Internal processing error');
            }
        }
    }
    
    // Process incoming sync messages
    private static Boolean processSyncMessage(SyncMessage message) {
        try {
            switch on message.objectType {
                when 'Account' {
                    return processAccountSync(message);
                }
                when 'Contact' {
                    return processContactSync(message);
                }
                when 'Opportunity' {
                    return processOpportunitySync(message);
                }
                when else {
                    logError('Unknown sync object type: ' + message.objectType);
                    return false;
                }
            }
        } catch (Exception e) {
            logError('Sync message processing failed: ' + e.getMessage());
            return false;
        }
    }
    
    // Process Account synchronization
    private static Boolean processAccountSync(SyncMessage message) {
        try {
            // Find existing account by external ID
            List<Account> existingAccounts = [
                SELECT Id, Name, Type, Industry, AnnualRevenue, BillingCountry,
                       External_Account_ID__c, Last_Sync_Timestamp__c
                FROM Account 
                WHERE External_Account_ID__c = :message.externalId
                LIMIT 1
            ];
            
            Account acc;
            Boolean isUpdate = false;
            
            if (!existingAccounts.isEmpty()) {
                acc = existingAccounts[0];
                isUpdate = true;
                
                // Check if this sync is newer than last processed
                if (acc.Last_Sync_Timestamp__c != null && 
                    message.timestamp <= acc.Last_Sync_Timestamp__c) {
                    // Skip older sync messages
                    return true;
                }
            } else {
                acc = new Account();
            }
            
            // Map sync data to Account
            mapSyncDataToAccount(message, acc);
            
            // Upsert account
            Database.UpsertResult result = Database.upsert(acc, Account.External_Account_ID__c);
            
            if (result.isSuccess()) {
                // Process related records if needed
                processRelatedRecords(acc.Id, message);
                
                // Create sync log
                createSyncLog(message, 'SUCCESS', isUpdate ? 'Updated' : 'Created');
                
                return true;
            } else {
                String errorMessage = result.getErrors()[0].getMessage();
                createSyncLog(message, 'ERROR', errorMessage);
                return false;
            }
            
        } catch (Exception e) {
            createSyncLog(message, 'ERROR', e.getMessage());
            return false;
        }
    }
    
    // Master Data Management Integration
    public class MasterDataManager {
        
        public static void syncMasterData(String objectType, List<Id> recordIds) {
            try {
                // Get master data service configuration
                Master_Data_Config__c config = Master_Data_Config__c.getOrgDefaults();
                
                if (!config.Enabled__c) {
                    return;
                }
                
                // Build master data payload
                MasterDataPayload payload = buildMasterDataPayload(objectType, recordIds);
                
                // Send to master data service
                HttpRequest req = new HttpRequest();
                req.setEndpoint(config.Master_Data_Endpoint__c + '/sync');
                req.setMethod('POST');
                req.setHeader('Content-Type', 'application/json');
                req.setHeader('Authorization', 'Bearer ' + config.Access_Token__c);
                req.setBody(JSON.serialize(payload));
                req.setTimeout(30000);
                
                Http http = new Http();
                HttpResponse res = http.send(req);
                
                if (res.getStatusCode() >= 200 && res.getStatusCode() < 300) {
                    logMasterDataSync(objectType, recordIds, 'SUCCESS');
                } else {
                    logMasterDataSync(objectType, recordIds, 'ERROR: ' + res.getBody());
                }
                
            } catch (Exception e) {
                logMasterDataSync(objectType, recordIds, 'ERROR: ' + e.getMessage());
            }
        }
        
        private static MasterDataPayload buildMasterDataPayload(String objectType, List<Id> recordIds) {
            MasterDataPayload payload = new MasterDataPayload();
            payload.sourceOrg = getOrgId();
            payload.objectType = objectType;
            payload.operation = 'SYNC';
            payload.timestamp = System.now();
            payload.records = new List<Map<String, Object>>();
            
            // Build records based on object type
            if (objectType == 'Account') {
                List<Account> accounts = [
                    SELECT Id, Name, Type, Industry, AnnualRevenue, BillingCountry,
                           External_Account_ID__c, Phone, Website
                    FROM Account 
                    WHERE Id IN :recordIds
                ];
                
                for (Account acc : accounts) {
                    Map<String, Object> recordData = new Map<String, Object>();
                    recordData.put('Id', acc.Id);
                    recordData.put('Name', acc.Name);
                    recordData.put('Type', acc.Type);
                    recordData.put('Industry', acc.Industry);
                    recordData.put('AnnualRevenue', acc.AnnualRevenue);
                    recordData.put('BillingCountry', acc.BillingCountry);
                    recordData.put('ExternalId', acc.External_Account_ID__c);
                    recordData.put('Phone', acc.Phone);
                    recordData.put('Website', acc.Website);
                    
                    payload.records.add(recordData);
                }
            }
            
            return payload;
        }
    }
    
    // Conflict Resolution Service
    public class ConflictResolutionService {
        
        public static void resolveDataConflicts(List<Data_Conflict__c> conflicts) {
            for (Data_Conflict__c conflict : conflicts) {
                try {
                    ConflictResolution resolution = resolveConflict(conflict);
                    applyResolution(conflict, resolution);
                    
                    conflict.Status__c = 'Resolved';
                    conflict.Resolution_Details__c = JSON.serialize(resolution);
                    conflict.Resolved_Date__c = System.now();
                    
                } catch (Exception e) {
                    conflict.Status__c = 'Error';
                    conflict.Error_Message__c = e.getMessage();
                }
            }
            
            update conflicts;
        }
        
        private static ConflictResolution resolveConflict(Data_Conflict__c conflict) {
            ConflictResolution resolution = new ConflictResolution();
            
            // Parse conflict data
            Map<String, Object> sourceData = (Map<String, Object>)JSON.deserializeUntyped(conflict.Source_Data__c);
            Map<String, Object> targetData = (Map<String, Object>)JSON.deserializeUntyped(conflict.Target_Data__c);
            
            // Apply resolution rules based on conflict type
            switch on conflict.Conflict_Type__c {
                when 'TIMESTAMP' {
                    // Use most recent timestamp
                    DateTime sourceTimestamp = (DateTime)sourceData.get('LastModifiedDate');
                    DateTime targetTimestamp = (DateTime)targetData.get('LastModifiedDate');
                    
                    resolution.winningRecord = sourceTimestamp > targetTimestamp ? 'SOURCE' : 'TARGET';
                    resolution.reason = 'Most recent timestamp wins';
                }
                when 'FIELD_VALUE' {
                    // Use business rules for field-level conflicts
                    resolution = resolveFieldConflict(conflict, sourceData, targetData);
                }
                when 'RECORD_OWNERSHIP' {
                    // Use org priority rules
                    resolution = resolveOwnershipConflict(conflict, sourceData, targetData);
                }
                when else {
                    // Default to manual resolution
                    resolution.winningRecord = 'MANUAL';
                    resolution.reason = 'Requires manual review';
                }
            }
            
            return resolution;
        }
        
        private static ConflictResolution resolveFieldConflict(Data_Conflict__c conflict, 
                                                              Map<String, Object> sourceData, 
                                                              Map<String, Object> targetData) {
            ConflictResolution resolution = new ConflictResolution();
            
            // Get field-specific resolution rules
            List<Conflict_Resolution_Rule__c> rules = [
                SELECT Field_Name__c, Resolution_Strategy__c, Priority_Org__c
                FROM Conflict_Resolution_Rule__c 
                WHERE Object_Type__c = :conflict.Object_Type__c
                AND Field_Name__c = :conflict.Field_Name__c
                ORDER BY Priority__c
            ];
            
            if (!rules.isEmpty()) {
                Conflict_Resolution_Rule__c rule = rules[0];
                
                switch on rule.Resolution_Strategy__c {
                    when 'SOURCE_WINS' {
                        resolution.winningRecord = 'SOURCE';
                        resolution.reason = 'Source org priority rule';
                    }
                    when 'TARGET_WINS' {
                        resolution.winningRecord = 'TARGET';
                        resolution.reason = 'Target org priority rule';
                    }
                    when 'ORG_PRIORITY' {
                        resolution.winningRecord = conflict.Source_Org__c == rule.Priority_Org__c ? 'SOURCE' : 'TARGET';
                        resolution.reason = 'Org priority: ' + rule.Priority_Org__c;
                    }
                    when else {
                        resolution.winningRecord = 'MANUAL';
                        resolution.reason = 'Manual review required';
                    }
                }
            } else {
                resolution.winningRecord = 'MANUAL';
                resolution.reason = 'No resolution rule found';
            }
            
            return resolution;
        }
    }
    
    // Utility methods and data classes
    private static SyncMessage createAccountSyncMessage(Account acc, String operation) {
        SyncMessage message = new SyncMessage();
        message.messageId = generateMessageId();
        message.sourceOrg = getOrgId();
        message.objectType = 'Account';
        message.operation = operation;
        message.externalId = acc.External_Account_ID__c;
        message.timestamp = System.now();
        
        // Build record data
        message.recordData = new Map<String, Object>();
        message.recordData.put('Id', acc.Id);
        message.recordData.put('Name', acc.Name);
        message.recordData.put('Type', acc.Type);
        message.recordData.put('Industry', acc.Industry);
        message.recordData.put('AnnualRevenue', acc.AnnualRevenue);
        message.recordData.put('BillingCountry', acc.BillingCountry);
        
        return message;
    }
    
    // Data classes
    public class SyncMessage {
        public String messageId;
        public String sourceOrg;
        public String objectType;
        public String operation;
        public String externalId;
        public DateTime timestamp;
        public Map<String, Object> recordData;
    }
    
    public class MasterDataPayload {
        public String sourceOrg;
        public String objectType;
        public String operation;
        public DateTime timestamp;
        public List<Map<String, Object>> records;
    }
    
    public class ConflictResolution {
        public String winningRecord;
        public String reason;
        public Map<String, Object> mergedData;
    }
    
    public class OrgConfig {
        public String instanceUrl;
        public String accessToken;
        
        public OrgConfig(String instanceUrl, String accessToken) {
            this.instanceUrl = instanceUrl;
            this.accessToken = accessToken;
        }
    }
    
    public class SyncException extends Exception {}
}`,
        language: 'apex',
        explanation: 'This comprehensive multi-org synchronization framework demonstrates enterprise patterns for managing data consistency across multiple Salesforce orgs. The solution includes real-time sync messaging, master data management integration, conflict resolution, and comprehensive error handling. It shows how to build scalable, reliable multi-org architectures while maintaining data integrity and business continuity.'
      }
    ],
    limitations: [
      'Multi-org architecture increases complexity and operational overhead',
      'Cross-org reporting requires additional integration and data aggregation',
      'User experience may be fragmented across multiple orgs',
      'License costs may be higher due to duplicate functionality across orgs',
      'Data synchronization introduces latency and potential consistency issues'
    ],
    architecturalConsiderations: [
      'Evaluate business requirements thoroughly before choosing multi-org architecture',
      'Design comprehensive data integration and synchronization strategies',
      'Implement consistent governance, security, and operational processes across orgs',
      'Plan for master data management and conflict resolution mechanisms',
      'Consider long-term maintenance, support, and evolution of multi-org environments'
    ]
  }, // ---------------------------
  // 1. Platform Basics
  // ---------------------------
  {
    title: "Salesforce Platform Basics",
    description: "Learn the architecture, navigation, and ecosystem of Salesforce.",
    subtopics: [
      { title: "Discover Use Cases", description: "Where and how Salesforce is used." },
      { title: "Understand Architecture", description: "Multi-tenant, metadata-driven architecture." },
      { title: "Navigate Setup", description: "Admin tools and configuration navigation." },
      { title: "AppExchange", description: "Find and install pre-built solutions." }
    ]
  },

  // ---------------------------
  // 2. Data Modeling
  // ---------------------------
  {
    title: "Data Modeling",
    description: "Design and relate your Salesforce data.",
    subtopics: [
      { title: "Standard vs Custom Objects", description: "Core objects vs your own." },
      { title: "Relationships", description: "Lookup, Master-Detail, Hierarchical." },
      { title: "Schema Builder", description: "Visual design tool for object relationships." },
      { title: "External Objects", description: "Access external data with Salesforce Connect." }
    ]
  },

  // ---------------------------
  // 3. Data Management
  // ---------------------------
  {
    title: "Data Management",
    description: "Import, export, clean, and secure your data.",
    subtopics: [
      { title: "Import Data", description: "Data Import Wizard, Data Loader." },
      { title: "Export Data", description: "Weekly export, Data Loader export." },
      { title: "Data Quality", description: "Validation rules, duplicate management." },
      { title: "Backup & Restore", description: "Backup strategies and Salesforce Backup & Restore tool." }
    ]
  },

  // ---------------------------
  // 4. Lightning Experience Customization
  // ---------------------------
  {
    title: "Lightning Experience Customization",
    description: "No-code customization of Salesforce UI.",
    subtopics: [
      { title: "Lightning Apps", description: "Custom navigation for users." },
      { title: "List Views", description: "Filters, conditional formatting." },
      { title: "Page Layouts & Compact Layouts", description: "Control field visibility and highlights." },
      { title: "Quick Actions", description: "Add buttons for common actions." },
      { title: "Dynamic Forms", description: "Conditional field visibility." },
      { title: "Lightning App Builder", description: "Drag-and-drop page customization." }
    ]
  },

  // ---------------------------
  // 5. Security & Access
  // ---------------------------
  {
    title: "Security & Access",
    description: "Protect data and manage user permissions.",
    subtopics: [
      { title: "Profiles", description: "Base-level permissions for users." },
      { title: "Permission Sets & Groups", description: "Extend access without changing profiles." },
      { title: "Role Hierarchy", description: "Record-level access by org structure." },
      { title: "Sharing Rules", description: "Automated record sharing." },
      { title: "Manual Sharing", description: "One-off record sharing." },
      { title: "Field-Level Security", description: "Restrict field visibility." },
      { title: "Login IP & Hours", description: "Restrict when and where users can log in." },
      { title: "Two-Factor Authentication", description: "Enhanced login security." }
    ]
  },

  // ---------------------------
  // 6. Business Automation
  // ---------------------------
  {
    title: "Business Process Automation",
    description: "Automate workflows without code.",
    subtopics: [
      { title: "Validation Rules", description: "Prevent invalid data entry." },
      { title: "Approval Processes", description: "Automated multi-step approvals." },
      { title: "Flows", description: "Record-triggered, scheduled, and screen flows." },
      { title: "Workflow Rules (Legacy)", description: "Simple field updates and emails." },
      { title: "Process Builder (Legacy)", description: "Point-and-click automation." }
    ]
  },

  // ---------------------------
  // 7. Reports & Dashboards
  // ---------------------------
  {
    title: "Reports & Dashboards",
    description: "Visualize and analyze your data.",
    subtopics: [
      { title: "Report Types", description: "Standard and custom report types." },
      { title: "Report Builder", description: "Drag-and-drop report creation." },
      { title: "Filters & Grouping", description: "Organize report data." },
      { title: "Formulas in Reports", description: "Custom calculations in reports." },
      { title: "Dashboard Builder", description: "Visualize data with charts and metrics." }
    ]
  },

  // ---------------------------
  // 8. Apex Development
  // ---------------------------
  {
    title: "Apex Development",
    description: "Server-side programming for Salesforce.",
    subtopics: [
      { title: "Apex Syntax & Data Types", description: "Variables, loops, conditions." },
      { title: "SOQL & SOSL", description: "Querying Salesforce data." },
      { title: "Triggers", description: "Automate processes at record level." },
      { title: "Async Apex", description: "Queueable, Batch, Future, Scheduled jobs." },
      { title: "Test Classes", description: "Unit testing and 75% coverage requirement." },
      { title: "Governor Limits", description: "Understanding and avoiding limits." },
      { title: "Apex Security", description: "CRUD, FLS checks in code." }
    ]
  },

  // ---------------------------
  // 9. Lightning Web Components (LWC)
  // ---------------------------
  {
    title: "Lightning Web Components",
    description: "Modern front-end framework for Salesforce.",
    subtopics: [
      { title: "LWC Basics", description: "Folder structure, component lifecycle." },
      { title: "Data Binding", description: "Reactive properties and @track/@api decorators." },
      { title: "Events", description: "Custom events and communication patterns." },
      { title: "Calling Apex", description: "Imperative and wire service." },
      { title: "Navigation", description: "Navigate to record pages and URLs." },
      { title: "Lightning Data Service", description: "CRUD operations without Apex." },
      { title: "Third-Party Libraries", description: "Importing JS libs in LWC." }
    ]
  },

  // ---------------------------
  // 10. Integration
  // ---------------------------
  {
    title: "Integration",
    description: "Connect Salesforce with external systems.",
    subtopics: [
      { title: "REST API", description: "Create, read, update, delete via REST." },
      { title: "SOAP API", description: "Legacy system integration." },
      { title: "Bulk API", description: "Large data loads." },
      { title: "Streaming API", description: "Push events from Salesforce." },
      { title: "Platform Events", description: "Event-driven architecture." },
      { title: "Named Credentials", description: "Secure API authentication." },
      { title: "External Services", description: "Schema-based integration." },
      { title: "Middleware", description: "Using Mulesoft, Boomi, etc." }
    ]
  },

  // ---------------------------
  // 11. Architect & Advanced Topics
  // ---------------------------
  {
    title: "Architect & Advanced Topics",
    description: "Design large-scale, secure, and scalable solutions.",
    subtopics: [
      { title: "Data Model Design Patterns", description: "E-R modeling best practices." },
      { title: "Sharing Model Design", description: "Performance considerations." },
      { title: "Integration Patterns", description: "Request-reply, batch data sync, event-driven." },
      { title: "Multi-Org Strategy", description: "Handling multiple Salesforce instances." },
      { title: "Large Data Volumes", description: "Indexes, skinny tables, selective queries." },
      { title: "Platform Limits", description: "API limits, storage, execution governors." }
    ]
  }

];