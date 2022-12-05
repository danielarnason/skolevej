
const schoolsMinimapIdParam = '[module.school_road.minimapid]';
const schoolsMinimapIdDev = '76e2a34d-d554-4d1c-b954-173974a623f7';
export const schoolsMinimapId = schoolsMinimapIdParam.includes('[') ? schoolsMinimapIdDev : schoolsMinimapIdParam;
