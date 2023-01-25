class Vehicle {
    constructor(name, model) {
        this.name = name;
        this.model = model;
    }

    describe() {
        return `${this.model} is a model of the ${this.name} brand of vehicles.`;
    }
}

class Dealer {
    constructor(name) {
        this.name = name;
        this.vehicles = [];
    }

    addVehicle(vehicle) {
        if (vehicle instanceof Vehicle) {
            this.vehicles.push(vehicle);
        } else {
            throw new Error(`You can only add an instance of Vehicle. Argument is not a vehicle: ${vehicle}`);
        }
    }

    describe() {
        return `${this.name} has ${this.vehicles.length} vehicles.`;
    }
}

class Menu {
    constructor() {
        this.dealers = [];
        this.selectedDealer = null;
    }

    start() {
        let selection = this.showMainMenuOptions();

        while (selection != 0) {
            switch (selection) {
                case '1':
                    this.createDealer();
                    break;
                case '2':
                    this.viewDealer();
                    break;
                case '3':
                    this.deleteDealer();
                    break;
                case '4':
                    this.displayDealers();
                    break;
                default:
                    selection = 0;
            }
            selection = this.showMainMenuOptions();
        }

        alert('You have successfully exited the Dealer Vehicle Locator system. ');
    }

    showMainMenuOptions() {
        return prompt(`
            0) Exit
            1) Create new dealer
            2) View dealer
            3) Delete dealer
            4) Display all dealers
            -----------------------
            Please choose a menu option to begin.
        `);
    }

    showDealerMenuOptions(dealerInfo) {
        return prompt(`
            0) Back   1) Create vehicle   2) Delete vehicle
            -----------------------
            ${dealerInfo}
        `);
    }

    displayDealers() {
        let dealerString = '';
        for (let i = 0; i < this.dealers.length; i++) {
            dealerString += i + ') ' + this.dealers[i].name + '\n';
        }
        if (dealerString.length === 0) {
            alert('There are no dealers. Click OK to go back and add a dealer.');
        } else {
            alert('Here are the dealers:' + '\n' + dealerString);
        }
    }

    createDealer() {
        let name = prompt('Enter name for new dealer:');
        this.dealers.push(new Dealer(name));
    }

    viewDealer() {
        let index = prompt('Enter the index of the dealer you wish to view:');
        if (index > -1 && index < this.dealers.length) {
            this.selectedDealer = this.dealers[index];
            let description = 'Dealer Name: ' + this.selectedDealer.name + '\n'
             + 'Vehicle Inventory:\n';
            
            if (this.selectedDealer.vehicles.length == 0) {
                description += 'There are no vehicles in stock with this dealer. Select option 1 to add a vehicle.'
            } else {
                for (let i = 0; i < this.selectedDealer.vehicles.length; i++) {
                    description += i + ') ' + this.selectedDealer.vehicles[i].name
                    + ' - ' + this.selectedDealer.vehicles[i].model + '\n';                        
                }
            }

            let selection = this.showDealerMenuOptions(description);
            switch (selection) {
                case '1':
                    this.createVehicle();
                    break;
                case '2':
                    this.deleteVehicle();
            }
        }
    }

    deleteDealer() {
        let index = prompt('Enter index of the dealer you wish to delete:');
        if (index > -1 && index < this.dealers.length) {
            this.dealers.splice(index, 1);
        }
    }

    createVehicle() {
        let name = prompt('Enter the make for new vehicle:');
        let model = prompt('Enter the model for new vehicle:');
        this.selectedDealer.vehicles.push(new Vehicle(name, model));
    }

    deleteVehicle() {
        let index = prompt('Enter the index of the vehicle you wish to delete:');
        if (index > -1 && index < this.selectedDealer.vehicles.length) {
            this.selectedDealer.vehicles.splice(index, 1);
        }
    }
}

let menu = new Menu();
menu.start();