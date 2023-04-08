import config from "../utils/config.js";

class Factory { 
    static getPersistence = async () => {
        switch(config.app.persistence) {
            case "ARRAY":
                const { default: RandomNumberDaoArray } = await import("./RandomNumbersDaoArray.js");
                return new RandomNumberDaoArray;
            
            case "FILE": 
                const { default: RandomNumberDaoFile } = await import("./RandomNumberFile.js");
                return new RandomNumberDaoFile;
        }
    }
} 

export default Factory;