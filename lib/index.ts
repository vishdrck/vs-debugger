import { CONSOLE_TYPES, COLORS } from './types/types';

export class VSDebugger {
    /**
     * Enable the debugger.
     * @default false
     */
    private enabled = false;

    // Singleton Data Store
    private static instance: VSDebugger;

    constructor() {

    }

    public enable(enable: boolean) {
        this.enabled = enable;
    }

    /**
     * Get the debugger instance. You need to declare in the entry point file before use.
     * @example 
     * 
     *   var debugger = new VSDebugger(true).getDebugger();
     */
    public static getDebugger() {
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
    public print(console_type: CONSOLE_TYPES = CONSOLE_TYPES.LOG, msg: string, data: any) {
        if (this.enabled) {
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
        console.group(COLORS.bg.Green, COLORS.fg.Black, '   LOG:   ', COLORS.Reset);
        console.log(COLORS.fg.Green, `${new Date(Date.now()).toLocaleDateString()} * ${msg} => ${data}`, COLORS.Reset);
        console.groupEnd();
    }
    private print_warn(msg: string, data: any) {
        console.group(COLORS.bg.Magenta, COLORS.fg.Yellow, '   WARN:  ', COLORS.Reset);
        console.warn(COLORS.fg.Magenta, `${new Date(Date.now()).toLocaleDateString()} * ${msg} => ${data}`, COLORS.Reset);
        console.groupEnd();
    }
    private print_error(msg: string, data: any) {
        console.group(COLORS.bg.Red, COLORS.fg.Yellow, '  ERROR:  ', COLORS.Reset);
        console.log(COLORS.fg.Red, `${new Date(Date.now()).toLocaleDateString()} * ${msg} => ${data}`, COLORS.Reset);
        console.groupEnd();
    }
    private print_info(msg: string, data: any) {
        console.group(COLORS.bg.Blue, COLORS.fg.Yellow, '   INFO:  ', COLORS.Reset);
        console.log(COLORS.fg.Blue, `${new Date(Date.now()).toLocaleDateString()} * ${msg} => ${data}`, COLORS.Reset);
        console.groupEnd();
    }

    public print_obj(msg: any, obj: Object) {
        console.log(`Log: %c${msg}`, 'color: lightgreen; font-style: italic;')
        console.table(obj);
    }

};

