import { CONSOLE_TYPES } from './types/types';
export class VSDebugger {
    /**
     * Enable the debugger.
     * @default false
     */
    private enable = false;

    // Singleton Data Store
    private static instance: VSDebugger;

    constructor(enable: boolean = false) {
        this.enable = enable;
    }

    /**
     * Get the debugger instance. You need to declare in the entry point file before use.
     * @example 
     * 
     *   var debugger = new VSDebugger(true).getDebugger();
     */
    private static getDebugger() {
        if (!this.instance) {
            this.instance = new VSDebugger();
        }
        return this.instance;
    }

    /**
     * 
     * @param console_type Console type for printing the data
     * LOG, ERROR, INFO, WARN    
     * @param msg Message before print the log message
     * @param data Any type of data should be passed to this method
     * @example
     *     var debugger = new VSDebugger(true).getDebugger();
     *     debugger.print(CONSOLE_TYPES.LOG,'Test print function',{name: 'John Doe'});
     */
    private print(console_type: CONSOLE_TYPES = CONSOLE_TYPES.LOG, msg: string, data: any) {
        if (this.enable) {
            if (console_type.localeCompare(CONSOLE_TYPES.LOG) === 0) {
                this.print_log(msg, data);
            } else if (console_type.localeCompare(CONSOLE_TYPES.ERROR) === 0) {
                this.print_error(msg, data);
            } else if (console_type.localeCompare(CONSOLE_TYPES.INFO) === 0) {
                this.print_info(msg, data);
            } else if (console_type.localeCompare(CONSOLE_TYPES.WARN) === 0) {
                this.print_warn(msg, data);
            } else {
                console.log(`Console: ${msg} => ${data}`);
            }
        }
    }

    private print_log(msg: string, data: any) {
        console.log(`Log: ${new Date(Date.now()).toLocaleDateString()} * ${msg} => ${data}`);
    }
    private print_warn(msg: string, data: any) {
        console.warn(`Warning: ${new Date(Date.now()).toLocaleDateString()} * ${msg} => ${data}`);
    }
    private print_error(msg: string, data: any) {
        console.log(`Error: ${new Date(Date.now()).toLocaleDateString()} * ${msg} => ${data}`);
    }
    private print_info(msg: string, data: any) {
        console.log(`Info: ${new Date(Date.now()).toLocaleDateString()} * ${msg} => ${data}`);
    }

};

