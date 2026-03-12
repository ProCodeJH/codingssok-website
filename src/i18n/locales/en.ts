import type { Locale } from './ko'

const en: Locale = {
    common: {
        loading: 'Loading...',
        error: 'An error occurred',
        retry: 'Try again',
        home: 'Go to Home',
        back: 'Back',
        next: 'Next',
        prev: 'Previous',
        save: 'Save',
        cancel: 'Cancel',
        delete: 'Delete',
        edit: 'Edit',
        confirm: 'Confirm',
        close: 'Close',
    },
    auth: {
        login: 'Login',
        logout: 'Logout',
        name: 'Name',
        pin: 'Password (4 digits)',
        loginButton: 'Start',
        loginLoading: 'Logging in...',
        signupComplete: 'Signup complete! Logging in...',
        wrongPin: 'Incorrect password',
        nameRequired: 'Please enter your name',
        pinRequired: 'Please enter a 4-digit password',
        rateLimited: 'Too many login attempts. Please try again later.',
    },
    dashboard: {
        learning: 'Learning',
        compiler: 'C-Studio',
        homework: 'Homework',
        problems: 'Problems',
        profile: 'Profile',
        materials: 'Materials',
    },
    xp: {
        attendance: 'Attendance',
        homeworkSubmit: 'Homework Submit',
        lessonComplete: 'Lesson Complete',
        dailyMission: 'Daily Mission',
        codeSubmit: 'Code Submit',
    },
    errors: {
        notFound: 'Page not found',
        offline: 'You are offline',
        serverError: 'Server error occurred',
    },
}

export default en
