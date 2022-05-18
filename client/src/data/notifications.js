const notifyMessages = {
  exam: {
    complete: {
      success: 'Exam has been completed.',
      error: 'Exam has not been completed. Please try again.'
    },
    incomplete: {
      success: 'Exam has been marked as incomplete.',
      error: 'Exam has not been marked as incomplete. Please try again.'
    },
    create: {
      success: 'Exam has been created.',
      error: 'Exam has not been created. Please try again.'
    },
    save: {
      success: 'Exam has been saved.',
      error: 'Exam has not been saved. Please try again.'
    },
    invite: {
      success: 'Invitation has been sent.',
      error: 'Invitation has not been sent. Please try again.'
    },
    access: {
      success: 'Access has been revoked.',
      error: 'Access has not been revoked. Please try again.'
    },
    request: {
      add: {
        success: 'Request has been added.',
        error: 'Request has not been added. Please try again.'
      },
      shared: {
        success: 'Request has been shared.',
        error: 'Request has not been shared. Please try again.'
      },
      unshared: {
        success: 'Request has been unshared.',
        error: 'Request has not been unshared. Please try again.'
      },
      save: {
        success: 'Request has been saved.',
        error: 'Request has not been saved. Please try again.'
      },
      complete: {
        success: 'Request has been marked as complete.',
        error: 'Request has been marked as complete. Please try again.'
      },
      incomplete: {
        success: 'Request has been marked as incomplete.',
        error: 'Request has been marked as incomplete. Please try again.'
      },
      note: {
        success: 'Note has been deleted.',
        error: 'Note has not been deleted. Please try again.'
      }
    }
  },
  folder: {
    create: {
      success: 'Folder has been created.',
      error: 'Folder has not been created. Please try again.'
    },
    upload: {
      success: 'Folder has been uploaded.',
      error: 'Folder has not been uploaded. Please try again.'
    },
    download: {
      success: 'Folder has been downloaded.',
      error: 'Folder has not been downloaded. Please try again.'
    }
  },
  file: {
    upload: {
      success: 'File has been uploaded.',
      error: 'Document has not been uploaded. File size must be less than 10MB.'
    }
  },
  review: {
    create: {
      success: 'Internal review has been created.',
      error: 'Internal review has not been created. Please try again.',
      validate: 'Internal Review report cannot be generated until all categories have been marked as complete.'
    },
    save: {
      success: 'Internal review has been saved.',
      error: 'Internal review has not been saved. Please try again.'
    },
    update: {
      success: 'Internal review has been updated.',
      error: 'Internal review has not been updated. Please try again.'
    },
    delete: {
      success: 'Internal review has been deleted.',
      error: 'Internal review has not been deleted. Please try again.'
    },
    duplicate: {
      success: 'Internal review has been duplicated.',
      error: 'Internal review has not been duplicated. Please try again.'
    },
    category: {
      topic: {
        delete: {
          success: 'Topic has been deleted.',
          error: 'Topic has not been deleted. Please try again.'
        }
      },
      item: {
        delete: {
          success: 'Item has been deleted.',
          error: 'Item has not been deleted. Please try again.'
        }
      },
      entry: {
        delete: {
          success: 'Entry has been deleted.',
          error: 'Entry has not been deleted. Please try again.'
        }
      },
      finding: {
        delete: {
          success: 'Finding has been deleted.',
          error: 'Finding has not been deleted. Please try again.'
        }
      },
      add: {
        success: 'Category has been added.',
        error: 'Category has not been added. Please try again.'
      },
      delete: {
        success: 'Category has been deleted.',
        error: 'Category has not been deleted. Please try again.'
      },
      update: {
        success: 'Category has been updated.',
        error: 'Category has not been updated. Please try again.'
      },
      complete: {
        success: 'Category has been marked as complete.',
        error: 'Category has not been marked as complete. Please try again.'
      },
      incomplete: {
        success: 'Category has been marked as incomplete.',
        error: 'Category has not been marked as incomplete. Please try again.'
      }
    }
  },
  task: {
    create: {
      success: 'Task has been created.',
      error: 'Task has not been created. Please try again.'
    },
    update: {
      success: 'Task has been updated.',
      error: 'Task has not been updated. Please try again.'
    },
    complete: {
      success: 'Task has been marked as complete.',
      error: 'Task has not been marked as complete. Please try again.'
    },
    incomplete: {
      success: 'Task has been marked as incomplete.',
      error: 'Task has not been marked as incomplete. Please try again.'
    },
    delete: {
      success: 'Task has been deleted.',
      error: 'Task has not been deleted. Please try again.'
    }
  },
  user: {
    create: {
      success: 'User has been created.',
      error: 'User has not been created. Please try again.'
    },
    update: {
      success: 'User has been updated.',
      error: 'User has not been updated. Please try again.'
    },
    reactive: {
      success: 'User has been reactivated',
      error: 'User has not been reactivated. Please try again'
    },
    disable: {
      new: {
        success: 'User has been disabled.',
        error: 'User has not been disabled. Please try again.'
      },
      update: {
        success: 'Reason has been updated.',
        error: 'Reason has not been updated. Please try again.'
      }
    }
  },
  job: {
    post: {
      success: 'Job has been posted.',
      error: 'Job has not been posted. Please try again.',
      validate: 'Job posting cannot be created until a valid payment method is added to your account.'
    },
    delete: {
      success: 'Job posting has been deleted.',
      error: 'Job posting has not been deleted. Please try again.'
    },
    save: {
      success: 'Job posting has been saved.',
      error: 'Job posting has not been saved. Please try again.'
    }
  },
  timesheet: {
    submit: {
      success: 'Timesheet has been submitted.',
      error: 'Timesheet has not been submitted. Please try again.'
    },
    save: {
      success: 'Timesheet has been saved.',
      error: 'Timesheet has not been saved. Please try again.'
    },
    approve: {
      success: 'Timesheet has been approved.',
      error: 'Timesheet has not been approved. Please try again.'
    },
    reject: {
      success: 'Timesheet has been rejected.',
      error: 'Timesheet has not been rejected. Please try again.'
    }
  },
  project: {
    create: {
      success: 'Project has been created.',
      error: 'Project has not been created. Please try again.'
    },
    edit: {
      success: 'Project has been edited.',
      error: 'Project has not been edited. Please try again.'
    },
    complete: {
      success: 'Project has been marked as complete.',
      error: 'Project has not been marked as complete. Please try again.',
      validate: 'Project has not been marked as complete. There is still an active contract for this project. Please end the contract to mark this project as complete.'
    },
    reactive: {
      success: 'Project has been reactivated.',
      error: 'Project has not been reactivated. Please try again.'
    },
    delete: {
      success: 'Project has been deleted.',
      error: 'Project has not been deleted. Please try again.',
      validate: 'Project has not been deleted. There is still an active contract for this project. Please end the contract to delete this project.'
    },
    collaborator: {
      add: {
        success: 'User has been added to the project.',
        error: 'User has been not added to the project. Please try again.'
      },
      remove: {
        success: 'User has been removed from the project.',
        error: 'User has been not removed from the project. Please try again.'
      }
    },
    role: {
      success: 'Role has been updated',
      error: 'Role has not been updated. Please try again.'
    },
    report: {
      success: 'Issue has been escalated for review',
      error: 'Issue has not been escalated for review. Please try again.'
    }
  },
  contract: {
    end: {
      success: 'Contract early completion request has been submitted.',
      error: 'Contract early completion request has not been submitted. Please try again.'
    }
  },
  proposal: {
    save: {
      success: 'Proposal has been saved.',
      error: 'Proposal has not been saved. Please try again.'
    },
    submit: {
      success: 'Proposal has been submitted.',
      error: 'Proposal has not been submitted. Please try again.'
    },
    accept: {
      success: 'Proposal has been rejected.',
      error: 'Proposal has not been rejected. Please try again.'
    },
    reject: {
      success: 'Proposal has been accepted.',
      error: 'Proposal has not been accepted. Please try again.'
    }
  },
  payment: {
    add: {
      success: 'New Payment Method has been added successfully.',
      error: 'New Payment Method has not been added. Please try again.'
    },
    input: { error: 'You have inputted wrong promo code. Please try again.' },
    primary: {
      success: 'Payment method has been made the primary payment source.',
      error: 'Payment method has not been made the primary payment source. Please try again.'
    },
    delete: {
      success: 'Payment method has been deleted.',
      error: 'Payment method has not been deleted. Please try again.',
      validate: 'Primary payment method cannot be deleted without adding an alternative payment method first.'
    }
  },
  subscription: {
    cancel: {
      success: 'Subscription has been cancelled.',
      error: 'Subscription has not been cancelled. Please try again.'
    }
  },
  seat: {
    add: {
      success: 'Seats have been updated.',
      error: 'Seats has not been added. Please try again.',
      validate: 'Please disable additional users to remove seats.'
    }
  },
  bank: {
    add: {
      success: 'Receiving bank has been added.',
      error: 'Receiving bank has not been added. Please try again.'
    }
  },
  plan: {
    upgrade: {
      success: 'Plan has been upgraded successfully.',
      error: 'Plan has not been upgraded successfully. Please try again.'
    }
  },
  promo: {
    input: {
      success: 'Promo code has been inputted successfully.',
      error: 'You have inputted wrong promo code. Please try again.'
    }
  },
  policy: {
    create: {
      success: 'New policy has been created.',
      error: 'Policy has not been created. Please try again.'
    },
    unarchive: {
      success: 'Policy has been unarchived and republished.',
      error: 'Policy has not been unarchived and republished. Please try again.'
    },
    delete: {
      success: 'Policy has been deleted.',
      error: 'Policy has not been deleted. Please try again.'
    },
    archive: {
      success: 'Policy has been archived.',
      error: 'Policy has not been archived. Please try again.'
    },
    setting: {
      success: 'Setting has been updated.',
      error: 'Setting has not been updated. Please try again.'
    },
    publish: {
      success: 'Policy has been published.',
      error: 'Policy has not been published. Please try again.'
    },
    save: {
      success: 'Policy has been saved.',
      error: 'Policy has not been saved. Please try again.'
    }
  },
  risk: {
    create: {
      success: 'New risk has been created.',
      error: 'Risk has not been deleted. Please try again.'
    },
    update: {
      success: 'Risk has been updated.',
      error: 'Risk has not been updated. Please try again.'
    },
    delete: {
      success: 'Risk has been deleted.',
      error: 'Risk has not been deleted. Please try again.'
    },
    control: {
      delete: {
        success: 'Control has been removed.',
        error: 'Control has not been removed. Please try again.'
      }
    }
  },
  profile: {
    save: {
      success: 'Information has been saved.',
      error: 'Information has not been saved.'
    },
    email: {
      success: 'Email has been updated.',
      error: 'Email has not been updated. Please try again'
    },
    password: {
      success: 'Password has been updated.',
      error: 'Password has not been updated. Please try again'
    },
    otp: {
      success: 'New verification code has been sent.',
      error: 'New verification code has not been sent. Please try again.'
    },
    reset: {
      success: 'Reset Link has been sent.'
    }
  },
  experience: {
    add: {
      success: 'Experience has been added.',
      error: 'Experience has not been added. Please try again.'
    },
    update: {
      success: 'Experience has been updated.',
      error: 'Experience has not been updated. Please try again.'
    }
  }
}

export { notifyMessages }
