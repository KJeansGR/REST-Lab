import * as wineService from "../services/wine.service.js"

export const getAllWines = (req,res) =>{
    const wines = wineService.getAll();

        res.status(200).json({
            message: "Wines gotten yup",
            data: wines
        });
};

export const getWineById = (req,res) =>{
    const id = Number(req.params.id);

    const wine = wineService.getById(id);

    if(!wine){
        return res.status(404).json({
            message: "ERROR: no wine with that id",
            data: null
        });
    }

        return res.status(200).json({
            message: "Wine found",
            data: wine
        });
}

//post
export const createWine = (req, res) =>{

    const {name, year} = req.body;

    if(!name || !year){
        return res.status(400).json({
            message: "name and year required",
            data: null
        })
    }

    const newWine = wineService.create({name,year});

    res.status(201).json({

        message: "wine created successfully",
        data: newWine
    })
};

export const updateWine = (req, res) =>{
    const id = Number(req.params.id);
    const {name, year} = req.body;

    if(!name || !year){
        return res.status(400).json({
            message: "PUT name and year required",
            data: null
        })
    }

    const updatedWine = wineService.update(id, {name, year})

    if(!updatedWine){
        return res.status(404).json({

            message: `Wine with id: ${id} not found`,
            data: null
        })
    }
    res.status(200).json({
        message: "wine updated successfully",
        data: updatedWine
    })
}

export const deleteWine = (req,res) => {
    const id = Number(req.params.id);

    const deleted = wineService.remove(id);

    if(!deleted){
        return res.status(404).json({
            message: `Wine with id ${id} does not exist`,
            data: null
        })
    }

    return res.status(200).json({
            message: `Wine with id ${id} deleted`,
            data: null
    })
}