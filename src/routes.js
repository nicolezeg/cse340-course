import express from 'express';

import { showHomePage } from './controllers/index.js';
import { showOrganizationsPage, showOrganizationDetailsPage, showNewOrganizationForm, showEditOrganizationForm, processNewOrganizationForm, processEditOrganizationForm, organizationValidation } from './controllers/organizations.js';
import {
    showProjectsPage,
    showProjectDetailsPage,
    showNewProjectForm,
    processNewProjectForm,
    showEditProjectForm,
    processEditProjectForm,
    projectValidation
} from './controllers/projects.js';

import {
    showCategoriesPage,
    showCategoryDetailsPage,
    showAssignCategoriesForm,
    processAssignCategoriesForm,
    showNewCategoryForm,
    processNewCategoryForm,
    showEditCategoryForm,
    processEditCategoryForm,
    categoryValidation
} from './controllers/categories.js';

import { testErrorPage } from './controllers/errors.js';

const router = express.Router();

router.get('/', showHomePage);
router.get('/organizations', showOrganizationsPage);

// Route for organization details page
router.get('/organization/:id', showOrganizationDetailsPage); 

// Route for new organization page
router.get('/new-organization', showNewOrganizationForm);

// Route to display the edit organization form
router.get('/edit-organization/:id', showEditOrganizationForm);

// Route to handle the edit organization form submission
router.post('/edit-organization/:id',organizationValidation, processEditOrganizationForm);

// Route to handle new organization form submission
router.post('/new-organization', organizationValidation, processNewOrganizationForm);

router.get('/projects', showProjectsPage);

// Route for new project page
router.get('/new-project', showNewProjectForm);

// Route to handle new project form submission
router.post('/new-project', projectValidation, processNewProjectForm);

// Routes for editing a service project
router.get('/edit-project/:id', showEditProjectForm);
router.post('/edit-project/:id', projectValidation, processEditProjectForm);

router.get('/categories', showCategoriesPage);
router.get('/category/:id', showCategoryDetailsPage);

// Routes for creating a new category
router.get('/new-category', showNewCategoryForm);
router.post('/new-category', categoryValidation, processNewCategoryForm);

// Routes for editing a category
router.get('/edit-category/:id', showEditCategoryForm);
router.post('/edit-category/:id', categoryValidation, processEditCategoryForm);

// Routes to handle assigning categories to a project
router.get('/assign-categories/:projectId', showAssignCategoriesForm);
router.post('/assign-categories/:projectId', processAssignCategoriesForm);

// error-handling routes
router.get('/test-error', testErrorPage);

// Route for individual project details
router.get('/project/:id', showProjectDetailsPage);

export default router;