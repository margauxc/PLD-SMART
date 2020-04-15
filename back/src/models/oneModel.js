
const validator = require('validator');
const {ErrorHandler} = require('../helpers')
module.exports = {
    model: (sequelize, DataTypes) => {
        const Subject = sequelize.define('Subject', {
            // Specific information for the subject
            url: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                allowNull: false,
                primaryKey: true
            },

            title: {
                type: DataTypes.STRING,
                allowNull: false,
                validate : {
                    notEmpty : true
                }
            },

            serviceInStructure: {
                type: DataTypes.STRING,
                allowNull: false,
                validate : {
                    notEmpty : true
                }
            },

            keywords: {
                type: DataTypes.STRING,
                allowNull: true
            },
            contextAndQuestion: {
                type: DataTypes.STRING,
                allowNull: false,
                validate : {
                    notEmpty : true
                }
            },
            topics: {
                type: DataTypes.STRING,
                allowNull: false,
                validate : {
                    notEmpty : true
                }
            },
            goals: {
                type: DataTypes.STRING,
                allowNull: false,
                validate : {
                    notEmpty : true
                }
            },
            requirements: {
                type: DataTypes.STRING,
                allowNull: false,
                validate : {
                    notEmpty : true
                }
            },
            deliverable: {
                type: DataTypes.STRING,
                allowNull: false,
                validate : {
                    notEmpty : true
                }
            },
            confidentiality: {
                type: DataTypes.STRING,
                allowNull: true
            },
            salary: {
                type: DataTypes.INTEGER,
                allowNull: false,
                validate : {
                    min : 0
                }
            },
            salaryNote: {
                type: DataTypes.STRING,
                allowNull: true
            },
            externalUrl : {
                type : DataTypes.STRING,
                allowNull : true,
                validate : {
                    urlCheck(value) {
                        if(value != null && !validator.default.isEmpty(value) && !validator.default.isURL(value)){
                            throw new ErrorHandler(403, "Url externe invalide")
                        }
                    }
                }
            },

            // Informations about the tutor
            tutorFirstName: {
                type: DataTypes.STRING,
                allowNull: false,
                validate : {
                    notEmpty : true
                }
            },
            tutorLastName: {
                type: DataTypes.STRING,
                allowNull: false,
                validate : {
                    notEmpty : true
                }
            },
            tutorPhoneNumber: {
                type: DataTypes.STRING,
                allowNull: false,
                validate : {
                    notEmpty : true
                }
            },
            tutorMail: {
                type: DataTypes.STRING,
                allowNull: false,
                validate : {
                    isEmail : {
                        args : [true],
                        msg : "Email du tuteur entreprise invalide"
                    }
                },
            },

            //information about suggested student and teacher
            suggestedStudent: {
                type: DataTypes.STRING,
                allowNull: true
            },

            suggestedTeacher: {
                type: DataTypes.STRING,
                allowNull: true
            },

            //information about assigned student and teacher
            assignedStudent: {
                type: DataTypes.STRING,
                allowNull: true,
                validate : {
                    checkEmail(value){
                        if(value != null && !validator.default.isEmpty(value) && !validator.default.isEmail(value)){
                            throw new ErrorHandler(403, "L'email de l'étudiant est invalide")
                        }
                    }
                }
            },

            assignedTeacher: {
                type: DataTypes.STRING,
                allowNull: true,
                validate : {
                    checkEmail(value){
                        if(value != null && !validator.default.isEmpty(value) && !validator.default.isEmail(value)){
                            throw new ErrorHandler(403, "L'email de l'enseignant est invalide")
                        }
                    }
                }
            },

            // flags
            isArchived: {
                type: DataTypes.BOOLEAN,
                allowNull: false
            },
            isAvailable: {
                type: DataTypes.BOOLEAN,
                allowNull: false
            },
            isConfidential: {
                type: DataTypes.BOOLEAN,
                allowNull: false
            }
        })

        return Subject;
    }
}