/**
 * Custom PostGIS Geometry Types for Drizzle ORM
 *
 * These types provide a workaround for PostGIS geometry types that aren't
 * directly supported by Drizzle's built-in geometry type.
 */

import { customType } from "drizzle-orm/pg-core";

// MultiPolygon type for complex boundaries (e.g., regions with islands)
export const multiPolygon = customType<{
  data: string; // GeoJSON string
}>({
  dataType() {
    return "geometry(MultiPolygon, 4326)";
  },
});

// Polygon type for simple boundaries
export const polygon = customType<{
  data: string; // GeoJSON string
}>({
  dataType() {
    return "geometry(Polygon, 4326)";
  },
});

// MultiPoint type for collections of points
export const multiPoint = customType<{
  data: string; // GeoJSON string
}>({
  dataType() {
    return "geometry(MultiPoint, 4326)";
  },
});

/**
 * Usage Example:
 *
 * import { multiPolygon } from './postgis-types';
 *
 * const regions = pgTable('regions', {
 *   id: uuid('id').primaryKey(),
 *   boundary: multiPolygon('boundary').notNull(),
 * });
 *
 * // Inserting data:
 * const regionData = {
 *   boundary: JSON.stringify({
 *     type: "MultiPolygon",
 *     coordinates: [[[[lng1, lat1], [lng2, lat2], ...]]]
 *   })
 * };
 *
 * await db.insert(regions).values(regionData);
 *
 * Note: The GeoJSON must be stringified before insertion.
 * PostGIS will automatically parse the GeoJSON string into its internal geometry format.
 */

// Helper type for GeoJSON structures
export type GeoJSONPolygon = {
  type: "Polygon";
  coordinates: number[][][];
};

export type GeoJSONMultiPolygon = {
  type: "MultiPolygon";
  coordinates: number[][][][];
};

export type GeoJSONMultiPoint = {
  type: "MultiPoint";
  coordinates: number[][];
};

// Helper function to create a GeoJSON polygon
export function createPolygon(coordinates: number[][][]): GeoJSONPolygon {
  return {
    type: "Polygon",
    coordinates,
  };
}

// Helper function to create a GeoJSON multiPolygon
export function createMultiPolygon(coordinates: number[][][][]): GeoJSONMultiPolygon {
  return {
    type: "MultiPolygon",
    coordinates,
  };
}

// Helper function to create a GeoJSON multiPoint
export function createMultiPoint(coordinates: number[][]): GeoJSONMultiPoint {
  return {
    type: "MultiPoint",
    coordinates,
  };
}
