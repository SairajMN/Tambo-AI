"use client";

import React from "react";

export interface ComponentProps {
  [key: string]: any;
}

export interface ComponentDefinition {
  name: string;
  component: React.ComponentType<ComponentProps>;
  propsSchema?: any;
  defaultProps?: ComponentProps;
  description?: string;
}

export interface TamboContextType {
  components: Record<string, ComponentDefinition>;
  registerComponent: (definition: ComponentDefinition) => void;
  getComponent: (name: string) => ComponentDefinition | null;
  renderComponent: (name: string, props?: ComponentProps) => React.ReactNode;
  listComponents: () => string[];
}

const TamboContext = React.createContext<TamboContextType | null>(null);

export const useTambo = () => {
  const context = React.useContext(TamboContext);
  if (!context) {
    throw new Error("useTambo must be used within a TamboProvider");
  }
  return context;
};

export const TamboProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [components, setComponents] = React.useState<
    Record<string, ComponentDefinition>
  >({});

  const registerComponent = React.useCallback(
    (definition: ComponentDefinition) => {
      setComponents((prev) => ({
        ...prev,
        [definition.name]: definition,
      }));
    },
    [],
  );

  const getComponent = React.useCallback(
    (name: string) => {
      return components[name] || null;
    },
    [components],
  );

  const renderComponent = React.useCallback(
    (name: string, props: ComponentProps = {}) => {
      const componentDef = getComponent(name);
      if (!componentDef) {
        return <div className="text-red-500">Component "{name}" not found</div>;
      }

      const Component = componentDef.component;
      return <Component {...componentDef.defaultProps} {...props} />;
    },
    [getComponent],
  );

  const listComponents = React.useCallback(() => {
    return Object.keys(components);
  }, [components]);

  const value: TamboContextType = {
    components,
    registerComponent,
    getComponent,
    renderComponent,
    listComponents,
  };

  return (
    <TamboContext.Provider value={value}>{children}</TamboContext.Provider>
  );
};
