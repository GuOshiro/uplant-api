const User = require('../models/user');
const Project = require('../models/projects');
const jwt = require('jsonwebtoken'); 
const config = require('../config/database'); 
const url = '/projects'

module.exports = (router) => {
   


    router.post(url, (req, res) => {
        
        if (!req.body.title) {
            res.json({ success: false, message: 'Title is required.' }); 
        } else {
            
            if (!req.body.body) {
                res.json({ success: false, message: 'Description is required.' }); 
            } else {
                
                if (!req.body.createdBy) {
                    res.json({ success: false, message: 'Creator is required.' }); 
                } else {
                    
                    const projects = new Project({
                        title: req.body.title, 
                        body: req.body.body, 
                        createdBy: req.body.createdBy 
                    });
                    
                    projects.save((err) => {
                        
                        if (err) {
                            
                            if (err.errors) {
                                
                                if (err.errors.title) {
                                    res.json({ success: false, message: err.errors.title.message }); 
                                } else {
                                    
                                    if (err.errors.body) {
                                        res.json({ success: false, message: err.errors.body.message }); 
                                    } else {
                                        res.json({ success: false, message: err }); 
                                    }
                                }
                            } else {
                                res.json({ success: false, message: err }); 
                            }
                        } else {
                            res.json({ success: true, message: 'Project saved!' }); 
                        }
                    });
                }
            }
        }
    });
   
    router.get('/projects', (req, res) => {
        
        Project.find({}, (err, projects) => {
            
            if (err) {
                res.json({ success: false, message: err }); 
            } else {
                
                if (!projects) {
                    res.json({ success: false, message: 'No project found.' }); 
                } else {
                    res.json({ success: true, project: projects }); 
                }
            }
        }).sort({ '_id': -1 }); 
    });
   
    return router;
};

