// Utility Types

// Partial<Type> - допустимо частичное использование интерфейса

interface Todo {
  title: string;
  description: string;
}

function updateTodo(todo: Todo, fieldsToUpdate: Partial<Todo>) {
  return { ...todo, ...fieldsToUpdate };
}

const todo1 = {
  title: "organize desk",
  description: "clear clutter",
};

const todo2 = updateTodo(todo1, {
  title: "throw out trash",
});

interface Props {
  a?: number;
  b?: string;
}

// Required<Type> - обязательное присутствие всех свойств

const obj: Props = { a: 5 };

const obj2: Required<Props> = { a: 5 };

// Readonly<Type> - свойства доступны только для чтения

interface Todo2 {
  title: string;
}

const todo: Readonly<Todo2> = {
  title: "Delete inactive users",
};

todo.title = "Hello";

// Record<Keys, Type> - позволяет задавать тип для ключа и значения в объекте

interface CatInfo {
  age: number;
  breed: string;
}

type CatName = "miffy" | "boris" | "mordred";

const cats: Record<CatName, CatInfo> = {
  miffy: { age: 10, height: "Persian" },
  boris: { age: 5, breed: "Maine Coon" },
  mordred: { age: 16, breed: "British Shorthair" },
};

// Pick<Type, Keys> - позволяет выбрать несколько свойств из конкретного типа

interface Todo3 {
  title: string;
  description: string;
  completed: boolean;
}

type TodoPreview = Pick<Todo3, "title" | "completed">;

const todo3: TodoPreview = {
  title: "Clean room",
  completed: false,
};

// Omit<Type, Keys> - позволяет создать новый тип, на основе предыдущего , удалив заданные свойства

interface Todo4 {
  title: string;
  description: string;
  completed: boolean;
  createdAt: number;
}

type TodoPreview4 = Omit<Todo4, "description">;

const todo4: TodoPreview4 = {
  title: "Clean room",
  completed: false,
  createdAt: 1615544252770,
};

// Exclude<UnionType, ExcludedMembers> - позволяет исключить свойства из типа

type Shape =
  | { kind: "circle"; radius: number }
  | { kind: "square"; x: number }
  | { kind: "triangle"; x: number; y: number };

type T3 = Exclude<Shape, { kind: "circle" }>;

const example: T3 = {
  kind: "square",
  y: 4,
};

// Extract<Type, Union> - создает тип из пересекаемых типов

type Shape2 =
  | { kind: "circle"; radius: number }
  | { kind: "square"; x: number }
  | { kind: "triangle"; x: number; y: number };

type T2 = Extract<Shape2, { kind: "circle" }>;

const example2: T2 = {
  kind: "circle",
  radius: 4,
};

// Parameters<Type> - получает параметры функций ?

type T5 = Parameters<(s: string) => void>; // T5 = [s: string];

type T6 = Parameters<<T>(arg: T) => T>; //T6 = [arg: unknown]

// ReturnType<Type> - возвращаемый тип функции

type T7 = ReturnType<() => string>; // T7 = string

type T8 = ReturnType<(s: string) => void>; // T8 = void

// Generics

function identity<Type>(arg: Type): Type {
  return arg;
}

const arr: Array<string> = ["1", "2"];

// объединение и расширение типов

type Type1 = {
  prop1: string;
  prop2: number;
};

type Type2 = {
  prop3: boolean;
};

type Type3 = Type1 | Type2;
