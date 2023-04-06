import formidable, { Files, Options } from "formidable"
export const uploadDir = 'uploads'
import express from 'express';
import IncomingForm from "formidable/Formidable";

export const initFormidable = (): IncomingForm => {
    let param: Partial<Options> = {
        keepExtensions: true,
        maxFiles: 1,
        maxFileSize: 5 * 1024 ** 3, // limit is 5MB
        filter: (part) => {
            return part.mimetype?.startsWith('image/') || false
        },
        filename: (originalName, originalExt, part, form) => {
            let fieldName = part.name?.substring(0, part.name.length - 1);
            let timestamp = Date.now();
            let ext = part.mimetype?.split("/").pop();
            return `${fieldName}-${timestamp}.${ext}`;
        }
    }
    const form = new formidable.IncomingForm(param)
    return form
}