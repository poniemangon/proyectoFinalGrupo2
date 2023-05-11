function validateAdmin(id_user_category){
    if(id_user_category == 2){
        return true;
    }
    else{
        return false;
    }
}

module.exports = validateAdmin;