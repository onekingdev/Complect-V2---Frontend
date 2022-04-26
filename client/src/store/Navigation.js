const topbarNavigation = [
  { title: 'Home' }, { title: 'Documents' }, { title: 'Reports' }
]

const sidebarNavigation = [
  {
    title: 'Overview',
    icon: 'list-outline',
    links: [
      {
        title: 'Dashboard',
        view: 'Dashboard'
      }, {
        title: 'Tasks',
        view: 'TasksOverview'
      }, {
        title: 'Projects',
        view: 'ProjectsOverview'
      }
    ]
  }, {
    title: 'Program Management',
    icon: 'document',
    links: [
      {
        title: 'Policies and Procedures',
        view: 'Policies'
      }, {
        title: 'Internal Reviews',
        view: 'ReviewsOverview'
      }, {
        title: 'Risk Register',
        view: 'RisksOverview'
      }
    ]
  }
]

const sidebarSpecialistNavigation = [{
  title: 'Overview',
  icon: 'list-outline',
  links: [
    {
      title: 'Dashboard',
      view: 'Dashboard'
    }, {
      title: 'Tasks',
      view: 'TasksOverview'
    }, {
      title: 'Jobs',
      view: 'JobsOverview'
    }
  ]
}]

const sidebarHomeNavigation = [
  {
    title: 'Overview',
    icon: 'list-outline',
    links: [
      {
        title: 'Dashboard',
        view: 'Dashboard'
      }, {
        title: 'Tasks',
        view: 'TasksOverview'
      }, {
        title: 'Projects',
        view: 'ProjectsOverview'
      }
    ]
  }, {
    title: 'Program Management',
    icon: 'document',
    links: [
      {
        title: 'Policies and Procedures',
        view: 'Policies'
      }, {
        title: 'Internal Reviews',
        view: 'ReviewsOverview'
      }, {
        title: 'Risk Register',
        view: 'RisksOverview'
      }
    ]
  }
]

const sidebarDocumentsNavigation = [{
  title: 'Files',
  icon: 'document',
  links: [
    {
      title: 'Book and Records',
      view: 'RecordsOverview'
    }, {
      title: 'Exam Management',
      view: 'ExamsOverview'
    }
  ]
}]

const sidebarReportsNavigation = [{
  title: 'Reports',
  icon: 'document',
  links: [
    {
      title: 'Organization',
      view: 'ReportOrganizations'
    }, {
      title: 'Risks',
      view: 'ReportRisks'
    }, {
      title: 'Financials',
      view: 'ReportFinancials'
    }
  ]
}]

const sidebarReportsSpecialistNavigation = [{
  title: 'REPORTS',
  icon: 'document',
  links: [{
    title: 'Financials',
    view: 'ReportFinancials'
  }]
}]

const _devModeNavigation = {
  title: 'Components',
  icon: 'components',
  links: [
    {
      title: 'Inputs',
      view: 'devInputsButtons'
    }, {
      title: 'Data',
      view: 'devDataModel'
    }, {
      title: 'Table',
      view: 'devTableGeneral'
    }, {
      title: 'Additional',
      view: 'devAdditionalIcons'
    }
  ]
}

// enable Components Navigation section in sidebar menu
if (import.meta.env.VITE_STAGE === 'dev') sidebarHomeNavigation.push(_devModeNavigation)

export default function useNavigation () {
  return {
    topbarNavigation,
    sidebarHomeNavigation,
    sidebarSpecialistNavigation,
    sidebarDocumentsNavigation,
    sidebarReportsNavigation,
    sidebarReportsSpecialistNavigation,
    sidebarNavigation
  }
}
