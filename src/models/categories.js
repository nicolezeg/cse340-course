import db from './db.js';

const getAllCategories = async () => {
    const query = `
        SELECT category_id, category_name
        FROM public.categories
        ORDER BY category_id;
    `;

    const result = await db.query(query);

    return result.rows;
};

// Retrieve a single category by its ID
const getCategoryById = async (categoryId) => {
    const query = `
        SELECT category_id, category_name
        FROM public.categories
        WHERE category_id = $1;
    `;

    const queryParams = [categoryId];
    const result = await db.query(query, queryParams);

    return result.rows[0];
};

// Retrieve all categories for a given service project
const getCategoriesByProjectId = async (projectId) => {
    const query = `
        SELECT
            categories.category_id,
            categories.category_name
        FROM public.categories
        INNER JOIN public.project_categories
            ON categories.category_id = project_categories.category_id
        WHERE project_categories.project_id = $1
        ORDER BY categories.category_id;
    `;

    const queryParams = [projectId];
    const result = await db.query(query, queryParams);

    return result.rows;
};

// Retrieve all service projects for a given category
const getProjectsByCategoryId = async (categoryId) => {
    const query = `
        SELECT
            service_project.project_id,
            service_project.title
        FROM public.service_project
        INNER JOIN public.project_categories
            ON service_project.project_id = project_categories.project_id
        WHERE project_categories.category_id = $1
        ORDER BY service_project.project_id;
    `;

    const queryParams = [categoryId];
    const result = await db.query(query, queryParams);

    return result.rows;
};

// Assign a category to a service project
const assignCategoryToProject = async (projectId, categoryId) => {
    const query = `
        INSERT INTO public.project_categories (project_id, category_id)
        VALUES ($1, $2);
    `;

    const queryParams = [projectId, categoryId];
    await db.query(query, queryParams);
};

// Update category assignments for a service project
const updateCategoryAssignments = async (projectId, categoryIds) => {
    // First, remove existing category assignments
    const deleteQuery = `
        DELETE FROM public.project_categories
        WHERE project_id = $1;
    `;

    await db.query(deleteQuery, [projectId]);

    // Add the new category assignments
    for (const categoryId of categoryIds) {
        await assignCategoryToProject(projectId, categoryId);
    }
};

const createCategory = async (categoryName) => {
    const query = `
        INSERT INTO public.categories (category_name)
        VALUES ($1)
        RETURNING category_id;
    `;

    const queryParams = [categoryName];
    const result = await db.query(query, queryParams);

    if (result.rows.length === 0) {
        throw new Error('Failed to create category');
    }

    return result.rows[0].category_id;
};

const updateCategory = async (categoryId, categoryName) => {
    const query = `
        UPDATE public.categories
        SET category_name = $1
        WHERE category_id = $2
        RETURNING category_id;
    `;

    const queryParams = [categoryName, categoryId];
    const result = await db.query(query, queryParams);

    if (result.rows.length === 0) {
        throw new Error('Failed to update category');
    }

    return result.rows[0].category_id;
};

export { 
    getAllCategories, 
    getCategoryById, 
    getCategoriesByProjectId, 
    getProjectsByCategoryId,
    updateCategoryAssignments,
    createCategory,
    updateCategory
};
