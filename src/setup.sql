-- ========================================
-- Organization Table
-- ========================================
CREATE TABLE organization (
    organization_id SERIAL PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    description TEXT NOT NULL,
    contact_email VARCHAR(255) NOT NULL,
    logo_filename VARCHAR(255) NOT NULL
);


-- ========================================
-- Insert sample data: Organizations
-- ========================================

INSERT INTO organization (
    name,
    description,
    contact_email,
    logo_filename
)
VALUES
(
    'BrightFuture Builders',
    'A nonprofit focused on improving community infrastructure through sustainable construction projects.',
    'info@brightfuturebuilders.org',
    'brightfuture-logo.png'
),
(
    'GreenHarvest Growers',
    'An urban farming collective promoting food sustainability and education in local neighborhoods.',
    'contact@greenharvest.org',
    'greenharvest-logo.png'
),
(
    'UnityServe Volunteers',
    'A volunteer coordination group supporting local charities and service initiatives.',
    'hello@unityserve.org',
    'unityserve-logo.png'
);


-- ========================================
-- Create table: Service Projects
-- ========================================

CREATE TABLE service_project (
    project_id SERIAL PRIMARY KEY,
    organization_id INTEGER NOT NULL,
    title VARCHAR(100) NOT NULL,
    description TEXT NOT NULL,
    location VARCHAR(150) NOT NULL,
    project_date DATE NOT NULL,

    CONSTRAINT fk_organization
        FOREIGN KEY (organization_id)
        REFERENCES organization (organization_id)
);


-- ========================================
-- Insert sample data: Service Projects
-- ========================================

INSERT INTO service_project (
    organization_id,
    title,
    description,
    location,
    project_date
)
VALUES
-- BrightFuture Builders (ID: 1)
(1, 'Community Park Renovation',
 'Renovating a public park and improving its facilities.',
 'Central Community Park', '2026-12-05'),

(1, 'School Playground Construction',
 'Building a safe playground for elementary school students.',
 'Lincoln Elementary School', '2026-12-12'),

(1, 'Community Center Painting',
 'Painting and improving a local community center.',
 'Downtown Community Center', '2026-12-19'),

(1, 'Public Garden Construction',
 'Creating a public garden with sustainable materials.',
 'Green Street', '2027-01-09'),

(1, 'Neighborhood Sidewalk Repair',
 'Repairing sidewalks to improve pedestrian safety.',
 'North District', '2027-01-16'),

-- GreenHarvest Growers (ID: 2)
(2, 'Urban Garden Workshop',
 'Teaching residents how to grow vegetables in urban spaces.',
 'Community Garden', '2026-12-06'),

(2, 'Tree Planting Day',
 'Planting trees to increase green areas in the neighborhood.',
 'Riverside Park', '2026-12-13'),

(2, 'Community Vegetable Garden',
 'Creating a vegetable garden for local families.',
 'West Neighborhood', '2026-12-20'),

(2, 'Composting Education Program',
 'Teaching families how to reduce food waste through composting.',
 'Public Library', '2027-01-10'),

(2, 'School Gardening Project',
 'Helping students create and maintain a school vegetable garden.',
 'Lincoln Elementary School', '2027-01-17'),

-- UnityServe Volunteers (ID: 3)
(3, 'Food Donation Campaign',
 'Collecting food donations for families in need.',
 'Community Food Bank', '2026-12-07'),

(3, 'Clothing Donation Drive',
 'Collecting clothes for people experiencing hardship.',
 'UnityServe Center', '2026-12-14'),

(3, 'Elderly Care Visit',
 'Visiting elderly residents and providing companionship.',
 'Sunrise Senior Center', '2026-12-21'),

(3, 'Community Cleanup',
 'Organizing volunteers to clean public spaces.',
 'Riverside Neighborhood', '2027-01-11'),

(3, 'Children Reading Program',
 'Helping children improve their reading skills through volunteer activities.',
 'Public Library', '2027-01-18');
