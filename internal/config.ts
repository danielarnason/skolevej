
const schoolsMinimapIdParam = '[module.school_road.minimapid]';
const schoolsMinimapIdDev = 'f6d308f6-ec17-4dc9-b0db-fa9841ee9588';
export const schoolsMinimapId = schoolsMinimapIdParam.includes('[') ? schoolsMinimapIdDev : schoolsMinimapIdParam;
