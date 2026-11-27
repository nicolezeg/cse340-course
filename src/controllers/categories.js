// Import any needed model functions
import {
    getAllCategories,
    getCategoryById,
    getProjectsByCategoryId,
    getCategoriesByProjectId,
    updateCategoryAssignments,
    createCategory,
    updateCategory
} from '../models/categories.js';

import { getProjectDetails } from '../models/projects.js';
import { body, validationResult } from 'express-validator';

const categoryValidation = [
    body('category_name')
        .trim()
        .notEmpty().withMessage('Category name is required')
        .isLength({ min: 3, max: 100 })
        .withMessage('Category name must be between 3 and 100 characters')
];

const showNewCategoryForm = (req, res) => {
    const title = 'Add New Category';

    res.render('new-category', { title });
};

const processNewCategoryForm = async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        errors.array().forEach((error) => {
            req.flash('error', error.msg);
        });

        return res.redirect('/new-category');
    }

    const { category_name } = req.body;

    try {
        await createCategory(category_name);

        req.flash('success', 'New category created successfully!');
        res.redirect('/categories');
    } catch (error) {
        console.error('Error creating category:', error);
        req.flash('error', 'There was an error creating the category.');
        res.redirect('/new-category');
    }
};

const showEditCategoryForm = async (req, res) => {
    const categoryId = req.params.id;

    const category = await getCategoryById(categoryId);
    const title = 'Edit Category';

    res.render('edit-category', { title, category });
};

const processEditCategoryForm = async (req, res) => {
    const categoryId = req.params.id;
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        errors.array().forEach((error) => {
            req.flash('error', error.msg);
        });

        return res.redirect(`/edit-category/${categoryId}`);
    }

    const { category_name } = req.body;

    try {
        await updateCategory(categoryId, category_name);

        req.flash('success', 'Category updated successfully!');
        res.redirect('/categories');
    } catch (error) {
        console.error('Error updating category:', error);
        req.flash('error', 'There was an error updating the category.');
        res.redirect(`/edit-category/${categoryId}`);
    }
};

// Define any controller functions
const showCategoriesPage = async (req, res) => {
    const categories = await getAllCategories();
    const title = 'Service Categories';

    res.render('categories', { title, categories });
};  

// Display details for a single category
const showCategoryDetailsPage = async (req, res) => {
    const categoryId = req.params.id;

    const category = await getCategoryById(categoryId);
    const projects = await getProjectsByCategoryId(categoryId);

    const title = 'Category Details';

    res.render('category', { title, category, projects });
};

// Display the form to assign categories to a project
const showAssignCategoriesForm = async (req, res) => {
    const projectId = req.params.projectId;

    const projectDetails = await getProjectDetails(projectId);
    const categories = await getAllCategories();
    const assignedCategories = await getCategoriesByProjectId(projectId);

    const title = 'Assign Categories to Project';

    res.render('assign-categories', {
        title,
        projectId,
        projectDetails,
        categories,
        assignedCategories
    });
};

// Process the category assignment form
const processAssignCategoriesForm = async (req, res) => {
    const projectId = req.params.projectId;
    const selectedCategoryIds = req.body.categoryIds || [];

    // Ensure selectedCategoryIds is an array
    const categoryIdsArray = Array.isArray(selectedCategoryIds)
        ? selectedCategoryIds
        : [selectedCategoryIds];

    await updateCategoryAssignments(projectId, categoryIdsArray);

    req.flash('success', 'Categories updated successfully.');

    res.redirect(`/project/${projectId}`);
};

// Export any controller functions
export { 
    showCategoriesPage, 
    showCategoryDetailsPage,
    showAssignCategoriesForm,
    processAssignCategoriesForm,
    showNewCategoryForm,
    processNewCategoryForm,
    showEditCategoryForm,
    processEditCategoryForm,
    categoryValidation
};