/*
Создайте систему управления правами доступа к объектам.
В каждой системе есть несколько ролей: администратор, пользователь и гость.
У каждой роли есть свои права на чтение, редактирование и удаление данных.
1. Создайте интерфейс Permissions, который описывает права (булевы значения) для ролей:
• canRead — можно читать,
• canEdit — можно редактировать,
• canDelete — можно удалять.
2. Определите тип RolePermissions, который будет индексироваться ролями:
’admin’, ’user’, ’guest’, а значением будет объект типа Permissions.
3. Создайте новый тип ReadOnlyRolePermissions, где все права для всех ролей будут изменены на
только для чтения (используйте модификатор readonly).
4. Реализуйте функцию setPermissions, которая принимает роль и права и изменяет права для этой роли,
если роль — не guest. Если роль — guest, права должны оставаться неизменными.
Требования:
• Использовать типы с модификатором readonly.
• Реализовать логику проверки роли для изменения прав.
 */

interface Permission {
    canRead: boolean;
    canEdit: boolean;
    canDelete: boolean;
}

type Role = 'admin' | 'user' | 'guest';

type RolePermissions = {
    [role in Role]: Permission;
}

type ReadOnlyRolePermissions = {
    readonly [role in Role]: Readonly<Permission>;
}

function setPermissions(role: Role,
                        currentPermissions: RolePermissions,
                        newPermissions: Permission) : RolePermissions {
    if (role == 'guest') {
        console.log("Права гостя недоступны для изменения")
        return currentPermissions;
    }

    return {
        ...currentPermissions,
        [role]: newPermissions
    };
}

// тесты тесты тесты тесты тесты тесты тесты тесты тесты тесты тесты тесты тесты тесты тесты тесты тесты
let currentPermissions: RolePermissions = {
    admin: {canRead: true, canEdit: true, canDelete: true},
    user: {canRead: true, canEdit: true, canDelete: true},
    guest: {canRead: false, canEdit: false, canDelete: false}
};

const newUserPermissions: Permission = {
    canRead: true,
    canEdit: false,
    canDelete: false,
};
const newGuestPermissions: Permission = {
    canRead: true,
    canEdit: true,
    canDelete: true,
};

currentPermissions = setPermissions('user', currentPermissions, newUserPermissions);
console.log(currentPermissions);

currentPermissions = setPermissions('guest', currentPermissions, newGuestPermissions);
console.log(currentPermissions);


